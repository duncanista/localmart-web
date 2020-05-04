import {
  Auth as FbAuth,
  DocumentReference,
  Firestore,
  Functions,
  Storage as FbStorage,
  TaskEvent,
} from './fb_app'
import { LM } from './localmart_schema'

function failWith(onFailReturn: any = []) {
  return (_: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value
    descriptor.value = async function () {
      try {
        const result = await originalMethod.apply(this, arguments)
        return result
      } catch (e) {
        console.warn(`store: ${propertyKey}(${[...arguments]}) failed: ${e}`)
        return onFailReturn
      }
    }

    return descriptor
  }
}

export abstract class EntityApi<T> {
  public abstract _collectionPath: string
  public abstract async create(
    creationData: Omit<T, 'uid'>
  ): Promise<void | DocumentReference<T>>
  public abstract async read(uid: string): Promise<T>
  public abstract async readAll(): Promise<T[]>
  public abstract async update({
    uid,
    ...updateData
  }: LM.idd & Partial<T>): Promise<void>
  public abstract async delete(uid: string): Promise<void>
}

export namespace Api {
  export class Auth {
    public static async signIn(mail: string, password: string) {
      return FbAuth.signInWithEmailAndPassword(mail, password)
    }

    public static async signOut() {
      await FbAuth.signOut()
    }
  }

  export class Storage {
    static upload = async (
      path: string,
      file: File,
      onStateChange: (snapshot: any) => void = () => {
        return
      },
      onError: (error: any) => void = e => {
        throw e
      },
      onSuccess: (downloadUrl: string) => void = () => {
        return
      }
    ) =>
      new Promise((resolve, reject) => {
        const sotrageRef = FbStorage.ref()
        const newChildRef = sotrageRef.child(path)
        const uploadTask = newChildRef.put(file)
        uploadTask.on(
          TaskEvent.STATE_CHANGED,
          snapshot => onStateChange(snapshot),
          error => {
            onError(error)
            reject()
          },
          async () => {
            const url = await newChildRef.getDownloadURL()
            onSuccess(url)
            resolve(url)
          }
        )
      })

    static async remove(path: string) {
      const sotrageRef = FbStorage.ref()
      const child = sotrageRef.child(path)
      return child.delete()
    }

    static removeMany = (paths: string[]) =>
      Promise.all(paths.map(path => Storage.remove(path)))
  }

  class Store {
    @failWith([])
    public static async getCollIddDocs<T>(
      path: string
    ): Promise<(T & LM.idd)[]> {
      const coll = await Firestore.collection(path).get()
      const result: (T & LM.idd)[] = []

      for (const doc of coll.docs) {
        const data = { ...(doc.data() as object) }
        result.push({ ...data, uid: doc.id } as T & LM.idd)
      }

      return result
    }

    @failWith(null)
    public static async getIddDoc<T>(path: string): Promise<T & LM.idd> {
      const docRef = await Firestore.doc(path).get()
      if (!docRef.exists) throw new Error(`Document at ${path}`)
      const document = docRef.data()
      return { ...document, uid: docRef.id } as T & LM.idd
    }

    public static async deleteDoc(path: string) {
      return Firestore.doc(path).delete()
    }

    public static async setItem<T>(item: T, collection: string, uid?: string) {
      if (!uid) {
        return Firestore.collection(collection).add(item)
      }
      return Firestore.collection(collection)
        .doc(uid)
        .set(item, { merge: true })
    }
  }

  const StoreEntityApi = <T extends LM.idd>(collectionPath: string) => {
    // tslint:disable-next-line: no-shadowed-variable
    class StoreEntityApi {
      public static _collectionPath: string = collectionPath

      public static async create(
        creationData: Omit<T, 'uid'>
      ): Promise<void | DocumentReference<T>> {
        return Store.setItem(creationData, this._collectionPath) as Promise<
          void
        >
      }
      @failWith(undefined)
      public static async read(uid: string): Promise<T> {
        return Store.getIddDoc(`${this._collectionPath}/${uid}`)
      }

      public static async readAll(): Promise<T[]> {
        return Store.getCollIddDocs<T>(`${this._collectionPath}`)
      }

      public static async update({
        uid,
        ...updateData
      }: LM.idd & Partial<T>): Promise<void> {
        return Store.setItem(updateData, this._collectionPath, uid) as Promise<
          void
        >
      }

      public static async delete(uid: string): Promise<void> {
        return Store.deleteDoc(`${this._collectionPath}/${uid}`)
      }
    }
    return StoreEntityApi
  }

  const addUser = Functions.httpsCallable('addUser')
  const updateUser = Functions.httpsCallable('updateUser')
  const deleteUser = Functions.httpsCallable('deleteUser')

  export class User extends StoreEntityApi<LM.StoreUser & LM.idd>('users') {
    public static async create({
      email,
      password,
      ...user
    }: LM.UserCreationData) {
      const userCred = await addUser({ email, password })

      if (!userCred.data) throw new Error('Error creating auth user')

      const {
        data: { uid },
      } = userCred
      return Store.setItem(
        { email, ...user },
        this._collectionPath,
        uid
      ) as Promise<void>
    }

    public static async update({
      uid,
      email,
      password,
      ...userData
    }: LM.UserUpdateData) {
      const passwordUpdate = password ? { password } : {}
      const emailUpdate = email ? { email } : {}

      if (email || password)
        await updateUser({ uid, ...emailUpdate, ...passwordUpdate })

      const emailData = email ? { email } : {}
      return super.update({ uid, ...userData, ...emailData })
    }

    public static async delete(uid: string) {
      await deleteUser({ uid })
      return super.delete(uid)
    }
  }

  export class Product extends StoreEntityApi<LM.Product & LM.idd>(
    'products'
  ) {
    @failWith(undefined)
    public static async readWithSerial(serialNo: string) {
      const queryResult = await Firestore.collection(this._collectionPath)
        .where('serial', '==', serialNo)
        .limit(1)
        .get()
      const doc = queryResult.docs[0]
      return { ...doc.data(), uid: doc.id } as LM.Product & LM.idd
    }
  }

  export class Company extends StoreEntityApi<LM.Company & LM.idd>(
    'companies'
  ) {}
}

// TODO move into utils file?
export namespace JMMImpl {
  export class StoreUserImpl implements LM.StoreUser {
    email = ''
    name = ''
    admin = false
    credentials: LM.Community = {}
  }
  export class UserCreationDataImpl extends StoreUserImpl
    implements LM.UserCreationData {
    password = ''
  }

  export class ProductIMPL implements LM.Product {
    seller = ''
    company = ''
    name = ''
    description = ''
    images = [] as LM.Images[]
  }

  export class CompanyImpl implements LM.Company {
    name = ''
  }
}

// TODO move into utils file?
export namespace Validation {
  export type Validator = (value: any) => string | undefined
  export const NEW = 'new'

  export const emailPattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  export const serialPattern = /^[\d\w]{3,}-[\d\w]{2,}-[\d\w]{4,}$/

  export const isObjectEmpty = (object: object): boolean =>
    !Object.keys(object).length || Object.values(object).every(value => !value)

  const check = (predicate: boolean, message: string = '') =>
    predicate ? undefined : message

  export const required = (message: string = 'this field') => (value: any) =>
    check(value, `${message} is required`)

  export const isOfLength = (length: number) => (value: string) =>
    check(value.length > length, `must be of length ${length}`)

  export const isEmail: Validator = (candidate: string) =>
    check(emailPattern.test(candidate), 'not a valid email')

  export const isSerial: Validator = (candidate: string) =>
    check(serialPattern.test(candidate), 'not a valid serial')

  export const all = (...validators: Validator[]) => (value: any) =>
    validators.reduce<string | undefined>(
      (error, validator) => error || validator(value),
      undefined
    )

  export const upperCaseFirst = (str: string) =>
    str[0].toUpperCase() + str.slice(1)
}
