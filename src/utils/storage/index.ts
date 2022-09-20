import { StorageSerializers, useStorage } from '@vueuse/core'

import settings from './settings.json'

const dictionary = {
  city: ['nanjing', 'shanghai']
}

const sessionData = {
  author: 'lzy'
}

class Locale {
  private system: any
  private dictionary: any
  private session: any

  constructor() {
    this.clear()
    this.sysStorage(settings)
    this.dictStorage(dictionary)
    this.tempStorage(sessionData)
  }
  sysStorage(settings: any) {
    this.system = useStorage('system', settings, undefined, {
      serializer: StorageSerializers.object
    })
  }
  dictStorage(dictionary: any) {
    this.dictionary = useStorage('dict', dictionary, undefined, {
      serializer: StorageSerializers.object
    })
  }
  tempStorage(sessionData: any) {
    this.session = useStorage('temp', sessionData, sessionStorage, {
      serializer: StorageSerializers.object
    })
  }
  getSystem() {
    return this.system
  }
  getDict() {
    return this.dictionary
  }
  getSession() {
    return this.session
  }
  get() {
    return {
      system: this.system,
      dictionary: this.dictionary,
      session: this.session
    }
  }
  removeSystem() {
    this.system.value = null
  }
  removeDict() {
    this.dictionary.value = null
  }
  removeSession() {
    this.session.value = null
  }
  remove() {
    this.system.value = null
    this.dictionary.value = null
    this.session.value = null
  }

  updateSystem(data: Record<string, any>) {
    this.system.value = {
      ...this.system.value,
      ...data
    }
  }
  updateDict(data: Record<string, any>) {
    this.dictionary.value = {
      ...this.dictionary.value,
      ...data
    }
  }
  updateSession(data: Record<string, any>) {
    this.session.value = {
      ...this.session.value,
      ...data
    }
  }
  clear() {
    localStorage.clear()
    sessionStorage.clear()
  }
}

const locale = new Locale()

export default locale
