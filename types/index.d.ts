declare interface Fn<T = any, R = T> {
  (...arg: T[]): R
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>
}

declare type RefType<T> = T | null

declare type LabelValueOptions = {
  label: string
  value: any
}[]

declare type EmitType = (event: string, ...args: any[]) => void

declare type TargetContext = '_self' | '_blank'

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>

declare type ForDataType<T> = {
  [P in T]?: ForDataType<T[P]>
}

declare type AnyFunction<T> = (...args: any[]) => T

type Recordable<T = any> = Record<string, T>

type PropType<T> = VuePropType<T>

type Writable<T> = {
  -readonly [P in keyof T]: T[P]
}

type Nullable<T> = T | null
type NonNullable<T> = T extends null | undefined ? never : T
type Recordable<T = any> = Record<string, T>
type ReadonlyRecordable<T = any> = {
  readonly [key: string]: T
}
type Indexable<T = any> = {
  [key: string]: T
}
type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
type TimeoutHandle = ReturnType<typeof setTimeout>
type IntervalHandle = ReturnType<typeof setInterval>

interface ChangeEvent extends Event {
  target: HTMLInputElement
}

interface WheelEvent {
  path?: EventTarget[]
}
interface ImportMetaEnv extends ViteEnv {
  __: unknown
}
