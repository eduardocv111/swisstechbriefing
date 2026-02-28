
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Article
 * 
 */
export type Article = $Result.DefaultSelection<Prisma.$ArticlePayload>
/**
 * Model ArticleTranslation
 * 
 */
export type ArticleTranslation = $Result.DefaultSelection<Prisma.$ArticleTranslationPayload>
/**
 * Model NewsletterSubscription
 * 
 */
export type NewsletterSubscription = $Result.DefaultSelection<Prisma.$NewsletterSubscriptionPayload>
/**
 * Model MarketSnapshot
 * 
 */
export type MarketSnapshot = $Result.DefaultSelection<Prisma.$MarketSnapshotPayload>
/**
 * Model MacroSnapshot
 * 
 */
export type MacroSnapshot = $Result.DefaultSelection<Prisma.$MacroSnapshotPayload>
/**
 * Model SnbSnapshot
 * 
 */
export type SnbSnapshot = $Result.DefaultSelection<Prisma.$SnbSnapshotPayload>
/**
 * Model SwissOpenDataSnapshot
 * 
 */
export type SwissOpenDataSnapshot = $Result.DefaultSelection<Prisma.$SwissOpenDataSnapshotPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Articles
 * const articles = await prisma.article.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Articles
   * const articles = await prisma.article.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.article`: Exposes CRUD operations for the **Article** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Articles
    * const articles = await prisma.article.findMany()
    * ```
    */
  get article(): Prisma.ArticleDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.articleTranslation`: Exposes CRUD operations for the **ArticleTranslation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ArticleTranslations
    * const articleTranslations = await prisma.articleTranslation.findMany()
    * ```
    */
  get articleTranslation(): Prisma.ArticleTranslationDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.newsletterSubscription`: Exposes CRUD operations for the **NewsletterSubscription** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NewsletterSubscriptions
    * const newsletterSubscriptions = await prisma.newsletterSubscription.findMany()
    * ```
    */
  get newsletterSubscription(): Prisma.NewsletterSubscriptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.marketSnapshot`: Exposes CRUD operations for the **MarketSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MarketSnapshots
    * const marketSnapshots = await prisma.marketSnapshot.findMany()
    * ```
    */
  get marketSnapshot(): Prisma.MarketSnapshotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.macroSnapshot`: Exposes CRUD operations for the **MacroSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MacroSnapshots
    * const macroSnapshots = await prisma.macroSnapshot.findMany()
    * ```
    */
  get macroSnapshot(): Prisma.MacroSnapshotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.snbSnapshot`: Exposes CRUD operations for the **SnbSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SnbSnapshots
    * const snbSnapshots = await prisma.snbSnapshot.findMany()
    * ```
    */
  get snbSnapshot(): Prisma.SnbSnapshotDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.swissOpenDataSnapshot`: Exposes CRUD operations for the **SwissOpenDataSnapshot** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SwissOpenDataSnapshots
    * const swissOpenDataSnapshots = await prisma.swissOpenDataSnapshot.findMany()
    * ```
    */
  get swissOpenDataSnapshot(): Prisma.SwissOpenDataSnapshotDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.4.1
   * Query Engine version: 55ae170b1ced7fc6ed07a15f110549408c501bb3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Article: 'Article',
    ArticleTranslation: 'ArticleTranslation',
    NewsletterSubscription: 'NewsletterSubscription',
    MarketSnapshot: 'MarketSnapshot',
    MacroSnapshot: 'MacroSnapshot',
    SnbSnapshot: 'SnbSnapshot',
    SwissOpenDataSnapshot: 'SwissOpenDataSnapshot'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "article" | "articleTranslation" | "newsletterSubscription" | "marketSnapshot" | "macroSnapshot" | "snbSnapshot" | "swissOpenDataSnapshot"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Article: {
        payload: Prisma.$ArticlePayload<ExtArgs>
        fields: Prisma.ArticleFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findFirst: {
            args: Prisma.ArticleFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          findMany: {
            args: Prisma.ArticleFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          create: {
            args: Prisma.ArticleCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          createMany: {
            args: Prisma.ArticleCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArticleCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          delete: {
            args: Prisma.ArticleDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          update: {
            args: Prisma.ArticleUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          deleteMany: {
            args: Prisma.ArticleDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArticleUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>[]
          }
          upsert: {
            args: Prisma.ArticleUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticlePayload>
          }
          aggregate: {
            args: Prisma.ArticleAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticle>
          }
          groupBy: {
            args: Prisma.ArticleGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleCountAggregateOutputType> | number
          }
        }
      }
      ArticleTranslation: {
        payload: Prisma.$ArticleTranslationPayload<ExtArgs>
        fields: Prisma.ArticleTranslationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ArticleTranslationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTranslationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ArticleTranslationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTranslationPayload>
          }
          findFirst: {
            args: Prisma.ArticleTranslationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTranslationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ArticleTranslationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTranslationPayload>
          }
          findMany: {
            args: Prisma.ArticleTranslationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTranslationPayload>[]
          }
          create: {
            args: Prisma.ArticleTranslationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTranslationPayload>
          }
          createMany: {
            args: Prisma.ArticleTranslationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ArticleTranslationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTranslationPayload>[]
          }
          delete: {
            args: Prisma.ArticleTranslationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTranslationPayload>
          }
          update: {
            args: Prisma.ArticleTranslationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTranslationPayload>
          }
          deleteMany: {
            args: Prisma.ArticleTranslationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ArticleTranslationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ArticleTranslationUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTranslationPayload>[]
          }
          upsert: {
            args: Prisma.ArticleTranslationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ArticleTranslationPayload>
          }
          aggregate: {
            args: Prisma.ArticleTranslationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateArticleTranslation>
          }
          groupBy: {
            args: Prisma.ArticleTranslationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ArticleTranslationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ArticleTranslationCountArgs<ExtArgs>
            result: $Utils.Optional<ArticleTranslationCountAggregateOutputType> | number
          }
        }
      }
      NewsletterSubscription: {
        payload: Prisma.$NewsletterSubscriptionPayload<ExtArgs>
        fields: Prisma.NewsletterSubscriptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NewsletterSubscriptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NewsletterSubscriptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>
          }
          findFirst: {
            args: Prisma.NewsletterSubscriptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NewsletterSubscriptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>
          }
          findMany: {
            args: Prisma.NewsletterSubscriptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>[]
          }
          create: {
            args: Prisma.NewsletterSubscriptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>
          }
          createMany: {
            args: Prisma.NewsletterSubscriptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NewsletterSubscriptionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>[]
          }
          delete: {
            args: Prisma.NewsletterSubscriptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>
          }
          update: {
            args: Prisma.NewsletterSubscriptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>
          }
          deleteMany: {
            args: Prisma.NewsletterSubscriptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NewsletterSubscriptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NewsletterSubscriptionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>[]
          }
          upsert: {
            args: Prisma.NewsletterSubscriptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsletterSubscriptionPayload>
          }
          aggregate: {
            args: Prisma.NewsletterSubscriptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNewsletterSubscription>
          }
          groupBy: {
            args: Prisma.NewsletterSubscriptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<NewsletterSubscriptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.NewsletterSubscriptionCountArgs<ExtArgs>
            result: $Utils.Optional<NewsletterSubscriptionCountAggregateOutputType> | number
          }
        }
      }
      MarketSnapshot: {
        payload: Prisma.$MarketSnapshotPayload<ExtArgs>
        fields: Prisma.MarketSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MarketSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MarketSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketSnapshotPayload>
          }
          findFirst: {
            args: Prisma.MarketSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MarketSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketSnapshotPayload>
          }
          findMany: {
            args: Prisma.MarketSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketSnapshotPayload>[]
          }
          create: {
            args: Prisma.MarketSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketSnapshotPayload>
          }
          createMany: {
            args: Prisma.MarketSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MarketSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketSnapshotPayload>[]
          }
          delete: {
            args: Prisma.MarketSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketSnapshotPayload>
          }
          update: {
            args: Prisma.MarketSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.MarketSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MarketSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MarketSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.MarketSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MarketSnapshotPayload>
          }
          aggregate: {
            args: Prisma.MarketSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMarketSnapshot>
          }
          groupBy: {
            args: Prisma.MarketSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<MarketSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.MarketSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<MarketSnapshotCountAggregateOutputType> | number
          }
        }
      }
      MacroSnapshot: {
        payload: Prisma.$MacroSnapshotPayload<ExtArgs>
        fields: Prisma.MacroSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MacroSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MacroSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MacroSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MacroSnapshotPayload>
          }
          findFirst: {
            args: Prisma.MacroSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MacroSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MacroSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MacroSnapshotPayload>
          }
          findMany: {
            args: Prisma.MacroSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MacroSnapshotPayload>[]
          }
          create: {
            args: Prisma.MacroSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MacroSnapshotPayload>
          }
          createMany: {
            args: Prisma.MacroSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MacroSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MacroSnapshotPayload>[]
          }
          delete: {
            args: Prisma.MacroSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MacroSnapshotPayload>
          }
          update: {
            args: Prisma.MacroSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MacroSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.MacroSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MacroSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MacroSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MacroSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.MacroSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MacroSnapshotPayload>
          }
          aggregate: {
            args: Prisma.MacroSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMacroSnapshot>
          }
          groupBy: {
            args: Prisma.MacroSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<MacroSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.MacroSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<MacroSnapshotCountAggregateOutputType> | number
          }
        }
      }
      SnbSnapshot: {
        payload: Prisma.$SnbSnapshotPayload<ExtArgs>
        fields: Prisma.SnbSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SnbSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SnbSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SnbSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SnbSnapshotPayload>
          }
          findFirst: {
            args: Prisma.SnbSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SnbSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SnbSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SnbSnapshotPayload>
          }
          findMany: {
            args: Prisma.SnbSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SnbSnapshotPayload>[]
          }
          create: {
            args: Prisma.SnbSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SnbSnapshotPayload>
          }
          createMany: {
            args: Prisma.SnbSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SnbSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SnbSnapshotPayload>[]
          }
          delete: {
            args: Prisma.SnbSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SnbSnapshotPayload>
          }
          update: {
            args: Prisma.SnbSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SnbSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.SnbSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SnbSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SnbSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SnbSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.SnbSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SnbSnapshotPayload>
          }
          aggregate: {
            args: Prisma.SnbSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSnbSnapshot>
          }
          groupBy: {
            args: Prisma.SnbSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<SnbSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.SnbSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<SnbSnapshotCountAggregateOutputType> | number
          }
        }
      }
      SwissOpenDataSnapshot: {
        payload: Prisma.$SwissOpenDataSnapshotPayload<ExtArgs>
        fields: Prisma.SwissOpenDataSnapshotFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SwissOpenDataSnapshotFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwissOpenDataSnapshotPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SwissOpenDataSnapshotFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwissOpenDataSnapshotPayload>
          }
          findFirst: {
            args: Prisma.SwissOpenDataSnapshotFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwissOpenDataSnapshotPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SwissOpenDataSnapshotFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwissOpenDataSnapshotPayload>
          }
          findMany: {
            args: Prisma.SwissOpenDataSnapshotFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwissOpenDataSnapshotPayload>[]
          }
          create: {
            args: Prisma.SwissOpenDataSnapshotCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwissOpenDataSnapshotPayload>
          }
          createMany: {
            args: Prisma.SwissOpenDataSnapshotCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SwissOpenDataSnapshotCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwissOpenDataSnapshotPayload>[]
          }
          delete: {
            args: Prisma.SwissOpenDataSnapshotDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwissOpenDataSnapshotPayload>
          }
          update: {
            args: Prisma.SwissOpenDataSnapshotUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwissOpenDataSnapshotPayload>
          }
          deleteMany: {
            args: Prisma.SwissOpenDataSnapshotDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SwissOpenDataSnapshotUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SwissOpenDataSnapshotUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwissOpenDataSnapshotPayload>[]
          }
          upsert: {
            args: Prisma.SwissOpenDataSnapshotUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SwissOpenDataSnapshotPayload>
          }
          aggregate: {
            args: Prisma.SwissOpenDataSnapshotAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSwissOpenDataSnapshot>
          }
          groupBy: {
            args: Prisma.SwissOpenDataSnapshotGroupByArgs<ExtArgs>
            result: $Utils.Optional<SwissOpenDataSnapshotGroupByOutputType>[]
          }
          count: {
            args: Prisma.SwissOpenDataSnapshotCountArgs<ExtArgs>
            result: $Utils.Optional<SwissOpenDataSnapshotCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    article?: ArticleOmit
    articleTranslation?: ArticleTranslationOmit
    newsletterSubscription?: NewsletterSubscriptionOmit
    marketSnapshot?: MarketSnapshotOmit
    macroSnapshot?: MacroSnapshotOmit
    snbSnapshot?: SnbSnapshotOmit
    swissOpenDataSnapshot?: SwissOpenDataSnapshotOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ArticleCountOutputType
   */

  export type ArticleCountOutputType = {
    translations: number
  }

  export type ArticleCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    translations?: boolean | ArticleCountOutputTypeCountTranslationsArgs
  }

  // Custom InputTypes
  /**
   * ArticleCountOutputType without action
   */
  export type ArticleCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleCountOutputType
     */
    select?: ArticleCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ArticleCountOutputType without action
   */
  export type ArticleCountOutputTypeCountTranslationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleTranslationWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Article
   */

  export type AggregateArticle = {
    _count: ArticleCountAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  export type ArticleMinAggregateOutputType = {
    id: string | null
    slug: string | null
    category: string | null
    date: Date | null
    authorName: string | null
    authorRole: string | null
    sourcesJson: string | null
    imageUrl: string | null
    expertQuote: string | null
    keyFactsJson: string | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    videoUrl: string | null
  }

  export type ArticleMaxAggregateOutputType = {
    id: string | null
    slug: string | null
    category: string | null
    date: Date | null
    authorName: string | null
    authorRole: string | null
    sourcesJson: string | null
    imageUrl: string | null
    expertQuote: string | null
    keyFactsJson: string | null
    isVerified: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
    videoUrl: string | null
  }

  export type ArticleCountAggregateOutputType = {
    id: number
    slug: number
    category: number
    date: number
    authorName: number
    authorRole: number
    sourcesJson: number
    imageUrl: number
    expertQuote: number
    keyFactsJson: number
    isVerified: number
    createdAt: number
    updatedAt: number
    videoUrl: number
    _all: number
  }


  export type ArticleMinAggregateInputType = {
    id?: true
    slug?: true
    category?: true
    date?: true
    authorName?: true
    authorRole?: true
    sourcesJson?: true
    imageUrl?: true
    expertQuote?: true
    keyFactsJson?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
    videoUrl?: true
  }

  export type ArticleMaxAggregateInputType = {
    id?: true
    slug?: true
    category?: true
    date?: true
    authorName?: true
    authorRole?: true
    sourcesJson?: true
    imageUrl?: true
    expertQuote?: true
    keyFactsJson?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
    videoUrl?: true
  }

  export type ArticleCountAggregateInputType = {
    id?: true
    slug?: true
    category?: true
    date?: true
    authorName?: true
    authorRole?: true
    sourcesJson?: true
    imageUrl?: true
    expertQuote?: true
    keyFactsJson?: true
    isVerified?: true
    createdAt?: true
    updatedAt?: true
    videoUrl?: true
    _all?: true
  }

  export type ArticleAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Article to aggregate.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Articles
    **/
    _count?: true | ArticleCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleMaxAggregateInputType
  }

  export type GetArticleAggregateType<T extends ArticleAggregateArgs> = {
        [P in keyof T & keyof AggregateArticle]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticle[P]>
      : GetScalarType<T[P], AggregateArticle[P]>
  }




  export type ArticleGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleWhereInput
    orderBy?: ArticleOrderByWithAggregationInput | ArticleOrderByWithAggregationInput[]
    by: ArticleScalarFieldEnum[] | ArticleScalarFieldEnum
    having?: ArticleScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleCountAggregateInputType | true
    _min?: ArticleMinAggregateInputType
    _max?: ArticleMaxAggregateInputType
  }

  export type ArticleGroupByOutputType = {
    id: string
    slug: string
    category: string
    date: Date
    authorName: string
    authorRole: string | null
    sourcesJson: string
    imageUrl: string | null
    expertQuote: string | null
    keyFactsJson: string | null
    isVerified: boolean
    createdAt: Date
    updatedAt: Date
    videoUrl: string | null
    _count: ArticleCountAggregateOutputType | null
    _min: ArticleMinAggregateOutputType | null
    _max: ArticleMaxAggregateOutputType | null
  }

  type GetArticleGroupByPayload<T extends ArticleGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleGroupByOutputType[P]>
        }
      >
    >


  export type ArticleSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    category?: boolean
    date?: boolean
    authorName?: boolean
    authorRole?: boolean
    sourcesJson?: boolean
    imageUrl?: boolean
    expertQuote?: boolean
    keyFactsJson?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    videoUrl?: boolean
    translations?: boolean | Article$translationsArgs<ExtArgs>
    _count?: boolean | ArticleCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    category?: boolean
    date?: boolean
    authorName?: boolean
    authorRole?: boolean
    sourcesJson?: boolean
    imageUrl?: boolean
    expertQuote?: boolean
    keyFactsJson?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    videoUrl?: boolean
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    slug?: boolean
    category?: boolean
    date?: boolean
    authorName?: boolean
    authorRole?: boolean
    sourcesJson?: boolean
    imageUrl?: boolean
    expertQuote?: boolean
    keyFactsJson?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    videoUrl?: boolean
  }, ExtArgs["result"]["article"]>

  export type ArticleSelectScalar = {
    id?: boolean
    slug?: boolean
    category?: boolean
    date?: boolean
    authorName?: boolean
    authorRole?: boolean
    sourcesJson?: boolean
    imageUrl?: boolean
    expertQuote?: boolean
    keyFactsJson?: boolean
    isVerified?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    videoUrl?: boolean
  }

  export type ArticleOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "slug" | "category" | "date" | "authorName" | "authorRole" | "sourcesJson" | "imageUrl" | "expertQuote" | "keyFactsJson" | "isVerified" | "createdAt" | "updatedAt" | "videoUrl", ExtArgs["result"]["article"]>
  export type ArticleInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    translations?: boolean | Article$translationsArgs<ExtArgs>
    _count?: boolean | ArticleCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ArticleIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ArticleIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ArticlePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Article"
    objects: {
      translations: Prisma.$ArticleTranslationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      slug: string
      category: string
      date: Date
      authorName: string
      authorRole: string | null
      sourcesJson: string
      imageUrl: string | null
      expertQuote: string | null
      keyFactsJson: string | null
      isVerified: boolean
      createdAt: Date
      updatedAt: Date
      videoUrl: string | null
    }, ExtArgs["result"]["article"]>
    composites: {}
  }

  type ArticleGetPayload<S extends boolean | null | undefined | ArticleDefaultArgs> = $Result.GetResult<Prisma.$ArticlePayload, S>

  type ArticleCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArticleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArticleCountAggregateInputType | true
    }

  export interface ArticleDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Article'], meta: { name: 'Article' } }
    /**
     * Find zero or one Article that matches the filter.
     * @param {ArticleFindUniqueArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleFindUniqueArgs>(args: SelectSubset<T, ArticleFindUniqueArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Article that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArticleFindUniqueOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Article that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleFindFirstArgs>(args?: SelectSubset<T, ArticleFindFirstArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Article that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindFirstOrThrowArgs} args - Arguments to find a Article
     * @example
     * // Get one Article
     * const article = await prisma.article.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Articles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Articles
     * const articles = await prisma.article.findMany()
     * 
     * // Get first 10 Articles
     * const articles = await prisma.article.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const articleWithIdOnly = await prisma.article.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArticleFindManyArgs>(args?: SelectSubset<T, ArticleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Article.
     * @param {ArticleCreateArgs} args - Arguments to create a Article.
     * @example
     * // Create one Article
     * const Article = await prisma.article.create({
     *   data: {
     *     // ... data to create a Article
     *   }
     * })
     * 
     */
    create<T extends ArticleCreateArgs>(args: SelectSubset<T, ArticleCreateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Articles.
     * @param {ArticleCreateManyArgs} args - Arguments to create many Articles.
     * @example
     * // Create many Articles
     * const article = await prisma.article.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleCreateManyArgs>(args?: SelectSubset<T, ArticleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Articles and returns the data saved in the database.
     * @param {ArticleCreateManyAndReturnArgs} args - Arguments to create many Articles.
     * @example
     * // Create many Articles
     * const article = await prisma.article.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Articles and only return the `id`
     * const articleWithIdOnly = await prisma.article.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArticleCreateManyAndReturnArgs>(args?: SelectSubset<T, ArticleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Article.
     * @param {ArticleDeleteArgs} args - Arguments to delete one Article.
     * @example
     * // Delete one Article
     * const Article = await prisma.article.delete({
     *   where: {
     *     // ... filter to delete one Article
     *   }
     * })
     * 
     */
    delete<T extends ArticleDeleteArgs>(args: SelectSubset<T, ArticleDeleteArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Article.
     * @param {ArticleUpdateArgs} args - Arguments to update one Article.
     * @example
     * // Update one Article
     * const article = await prisma.article.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleUpdateArgs>(args: SelectSubset<T, ArticleUpdateArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Articles.
     * @param {ArticleDeleteManyArgs} args - Arguments to filter Articles to delete.
     * @example
     * // Delete a few Articles
     * const { count } = await prisma.article.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleDeleteManyArgs>(args?: SelectSubset<T, ArticleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Articles
     * const article = await prisma.article.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleUpdateManyArgs>(args: SelectSubset<T, ArticleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Articles and returns the data updated in the database.
     * @param {ArticleUpdateManyAndReturnArgs} args - Arguments to update many Articles.
     * @example
     * // Update many Articles
     * const article = await prisma.article.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Articles and only return the `id`
     * const articleWithIdOnly = await prisma.article.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArticleUpdateManyAndReturnArgs>(args: SelectSubset<T, ArticleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Article.
     * @param {ArticleUpsertArgs} args - Arguments to update or create a Article.
     * @example
     * // Update or create a Article
     * const article = await prisma.article.upsert({
     *   create: {
     *     // ... data to create a Article
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Article we want to update
     *   }
     * })
     */
    upsert<T extends ArticleUpsertArgs>(args: SelectSubset<T, ArticleUpsertArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Articles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleCountArgs} args - Arguments to filter Articles to count.
     * @example
     * // Count the number of Articles
     * const count = await prisma.article.count({
     *   where: {
     *     // ... the filter for the Articles we want to count
     *   }
     * })
    **/
    count<T extends ArticleCountArgs>(
      args?: Subset<T, ArticleCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArticleAggregateArgs>(args: Subset<T, ArticleAggregateArgs>): Prisma.PrismaPromise<GetArticleAggregateType<T>>

    /**
     * Group by Article.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArticleGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleGroupByArgs['orderBy'] }
        : { orderBy?: ArticleGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArticleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Article model
   */
  readonly fields: ArticleFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Article.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    translations<T extends Article$translationsArgs<ExtArgs> = {}>(args?: Subset<T, Article$translationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Article model
   */
  interface ArticleFieldRefs {
    readonly id: FieldRef<"Article", 'String'>
    readonly slug: FieldRef<"Article", 'String'>
    readonly category: FieldRef<"Article", 'String'>
    readonly date: FieldRef<"Article", 'DateTime'>
    readonly authorName: FieldRef<"Article", 'String'>
    readonly authorRole: FieldRef<"Article", 'String'>
    readonly sourcesJson: FieldRef<"Article", 'String'>
    readonly imageUrl: FieldRef<"Article", 'String'>
    readonly expertQuote: FieldRef<"Article", 'String'>
    readonly keyFactsJson: FieldRef<"Article", 'String'>
    readonly isVerified: FieldRef<"Article", 'Boolean'>
    readonly createdAt: FieldRef<"Article", 'DateTime'>
    readonly updatedAt: FieldRef<"Article", 'DateTime'>
    readonly videoUrl: FieldRef<"Article", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Article findUnique
   */
  export type ArticleFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findUniqueOrThrow
   */
  export type ArticleFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article findFirst
   */
  export type ArticleFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findFirstOrThrow
   */
  export type ArticleFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Article to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Articles.
     */
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article findMany
   */
  export type ArticleFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter, which Articles to fetch.
     */
    where?: ArticleWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Articles to fetch.
     */
    orderBy?: ArticleOrderByWithRelationInput | ArticleOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Articles.
     */
    cursor?: ArticleWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Articles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Articles.
     */
    skip?: number
    distinct?: ArticleScalarFieldEnum | ArticleScalarFieldEnum[]
  }

  /**
   * Article create
   */
  export type ArticleCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The data needed to create a Article.
     */
    data: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
  }

  /**
   * Article createMany
   */
  export type ArticleCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Articles.
     */
    data: ArticleCreateManyInput | ArticleCreateManyInput[]
  }

  /**
   * Article createManyAndReturn
   */
  export type ArticleCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * The data used to create many Articles.
     */
    data: ArticleCreateManyInput | ArticleCreateManyInput[]
  }

  /**
   * Article update
   */
  export type ArticleUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The data needed to update a Article.
     */
    data: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
    /**
     * Choose, which Article to update.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article updateMany
   */
  export type ArticleUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Articles.
     */
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
    /**
     * Filter which Articles to update
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to update.
     */
    limit?: number
  }

  /**
   * Article updateManyAndReturn
   */
  export type ArticleUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * The data used to update Articles.
     */
    data: XOR<ArticleUpdateManyMutationInput, ArticleUncheckedUpdateManyInput>
    /**
     * Filter which Articles to update
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to update.
     */
    limit?: number
  }

  /**
   * Article upsert
   */
  export type ArticleUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * The filter to search for the Article to update in case it exists.
     */
    where: ArticleWhereUniqueInput
    /**
     * In case the Article found by the `where` argument doesn't exist, create a new Article with this data.
     */
    create: XOR<ArticleCreateInput, ArticleUncheckedCreateInput>
    /**
     * In case the Article was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleUpdateInput, ArticleUncheckedUpdateInput>
  }

  /**
   * Article delete
   */
  export type ArticleDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
    /**
     * Filter which Article to delete.
     */
    where: ArticleWhereUniqueInput
  }

  /**
   * Article deleteMany
   */
  export type ArticleDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Articles to delete
     */
    where?: ArticleWhereInput
    /**
     * Limit how many Articles to delete.
     */
    limit?: number
  }

  /**
   * Article.translations
   */
  export type Article$translationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTranslation
     */
    select?: ArticleTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTranslation
     */
    omit?: ArticleTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTranslationInclude<ExtArgs> | null
    where?: ArticleTranslationWhereInput
    orderBy?: ArticleTranslationOrderByWithRelationInput | ArticleTranslationOrderByWithRelationInput[]
    cursor?: ArticleTranslationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ArticleTranslationScalarFieldEnum | ArticleTranslationScalarFieldEnum[]
  }

  /**
   * Article without action
   */
  export type ArticleDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Article
     */
    select?: ArticleSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Article
     */
    omit?: ArticleOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleInclude<ExtArgs> | null
  }


  /**
   * Model ArticleTranslation
   */

  export type AggregateArticleTranslation = {
    _count: ArticleTranslationCountAggregateOutputType | null
    _min: ArticleTranslationMinAggregateOutputType | null
    _max: ArticleTranslationMaxAggregateOutputType | null
  }

  export type ArticleTranslationMinAggregateOutputType = {
    id: string | null
    articleId: string | null
    locale: string | null
    title: string | null
    excerpt: string | null
    contentHtml: string | null
    metaTitle: string | null
    metaDescription: string | null
    updatedAt: Date | null
    expertQuote: string | null
    keyFactsJson: string | null
  }

  export type ArticleTranslationMaxAggregateOutputType = {
    id: string | null
    articleId: string | null
    locale: string | null
    title: string | null
    excerpt: string | null
    contentHtml: string | null
    metaTitle: string | null
    metaDescription: string | null
    updatedAt: Date | null
    expertQuote: string | null
    keyFactsJson: string | null
  }

  export type ArticleTranslationCountAggregateOutputType = {
    id: number
    articleId: number
    locale: number
    title: number
    excerpt: number
    contentHtml: number
    metaTitle: number
    metaDescription: number
    updatedAt: number
    expertQuote: number
    keyFactsJson: number
    _all: number
  }


  export type ArticleTranslationMinAggregateInputType = {
    id?: true
    articleId?: true
    locale?: true
    title?: true
    excerpt?: true
    contentHtml?: true
    metaTitle?: true
    metaDescription?: true
    updatedAt?: true
    expertQuote?: true
    keyFactsJson?: true
  }

  export type ArticleTranslationMaxAggregateInputType = {
    id?: true
    articleId?: true
    locale?: true
    title?: true
    excerpt?: true
    contentHtml?: true
    metaTitle?: true
    metaDescription?: true
    updatedAt?: true
    expertQuote?: true
    keyFactsJson?: true
  }

  export type ArticleTranslationCountAggregateInputType = {
    id?: true
    articleId?: true
    locale?: true
    title?: true
    excerpt?: true
    contentHtml?: true
    metaTitle?: true
    metaDescription?: true
    updatedAt?: true
    expertQuote?: true
    keyFactsJson?: true
    _all?: true
  }

  export type ArticleTranslationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleTranslation to aggregate.
     */
    where?: ArticleTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleTranslations to fetch.
     */
    orderBy?: ArticleTranslationOrderByWithRelationInput | ArticleTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ArticleTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ArticleTranslations
    **/
    _count?: true | ArticleTranslationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ArticleTranslationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ArticleTranslationMaxAggregateInputType
  }

  export type GetArticleTranslationAggregateType<T extends ArticleTranslationAggregateArgs> = {
        [P in keyof T & keyof AggregateArticleTranslation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateArticleTranslation[P]>
      : GetScalarType<T[P], AggregateArticleTranslation[P]>
  }




  export type ArticleTranslationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ArticleTranslationWhereInput
    orderBy?: ArticleTranslationOrderByWithAggregationInput | ArticleTranslationOrderByWithAggregationInput[]
    by: ArticleTranslationScalarFieldEnum[] | ArticleTranslationScalarFieldEnum
    having?: ArticleTranslationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ArticleTranslationCountAggregateInputType | true
    _min?: ArticleTranslationMinAggregateInputType
    _max?: ArticleTranslationMaxAggregateInputType
  }

  export type ArticleTranslationGroupByOutputType = {
    id: string
    articleId: string
    locale: string
    title: string
    excerpt: string
    contentHtml: string
    metaTitle: string | null
    metaDescription: string | null
    updatedAt: Date
    expertQuote: string | null
    keyFactsJson: string | null
    _count: ArticleTranslationCountAggregateOutputType | null
    _min: ArticleTranslationMinAggregateOutputType | null
    _max: ArticleTranslationMaxAggregateOutputType | null
  }

  type GetArticleTranslationGroupByPayload<T extends ArticleTranslationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ArticleTranslationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ArticleTranslationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ArticleTranslationGroupByOutputType[P]>
            : GetScalarType<T[P], ArticleTranslationGroupByOutputType[P]>
        }
      >
    >


  export type ArticleTranslationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    articleId?: boolean
    locale?: boolean
    title?: boolean
    excerpt?: boolean
    contentHtml?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    updatedAt?: boolean
    expertQuote?: boolean
    keyFactsJson?: boolean
    article?: boolean | ArticleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleTranslation"]>

  export type ArticleTranslationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    articleId?: boolean
    locale?: boolean
    title?: boolean
    excerpt?: boolean
    contentHtml?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    updatedAt?: boolean
    expertQuote?: boolean
    keyFactsJson?: boolean
    article?: boolean | ArticleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleTranslation"]>

  export type ArticleTranslationSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    articleId?: boolean
    locale?: boolean
    title?: boolean
    excerpt?: boolean
    contentHtml?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    updatedAt?: boolean
    expertQuote?: boolean
    keyFactsJson?: boolean
    article?: boolean | ArticleDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["articleTranslation"]>

  export type ArticleTranslationSelectScalar = {
    id?: boolean
    articleId?: boolean
    locale?: boolean
    title?: boolean
    excerpt?: boolean
    contentHtml?: boolean
    metaTitle?: boolean
    metaDescription?: boolean
    updatedAt?: boolean
    expertQuote?: boolean
    keyFactsJson?: boolean
  }

  export type ArticleTranslationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "articleId" | "locale" | "title" | "excerpt" | "contentHtml" | "metaTitle" | "metaDescription" | "updatedAt" | "expertQuote" | "keyFactsJson", ExtArgs["result"]["articleTranslation"]>
  export type ArticleTranslationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    article?: boolean | ArticleDefaultArgs<ExtArgs>
  }
  export type ArticleTranslationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    article?: boolean | ArticleDefaultArgs<ExtArgs>
  }
  export type ArticleTranslationIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    article?: boolean | ArticleDefaultArgs<ExtArgs>
  }

  export type $ArticleTranslationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ArticleTranslation"
    objects: {
      article: Prisma.$ArticlePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      articleId: string
      locale: string
      title: string
      excerpt: string
      contentHtml: string
      metaTitle: string | null
      metaDescription: string | null
      updatedAt: Date
      expertQuote: string | null
      keyFactsJson: string | null
    }, ExtArgs["result"]["articleTranslation"]>
    composites: {}
  }

  type ArticleTranslationGetPayload<S extends boolean | null | undefined | ArticleTranslationDefaultArgs> = $Result.GetResult<Prisma.$ArticleTranslationPayload, S>

  type ArticleTranslationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ArticleTranslationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ArticleTranslationCountAggregateInputType | true
    }

  export interface ArticleTranslationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ArticleTranslation'], meta: { name: 'ArticleTranslation' } }
    /**
     * Find zero or one ArticleTranslation that matches the filter.
     * @param {ArticleTranslationFindUniqueArgs} args - Arguments to find a ArticleTranslation
     * @example
     * // Get one ArticleTranslation
     * const articleTranslation = await prisma.articleTranslation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ArticleTranslationFindUniqueArgs>(args: SelectSubset<T, ArticleTranslationFindUniqueArgs<ExtArgs>>): Prisma__ArticleTranslationClient<$Result.GetResult<Prisma.$ArticleTranslationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ArticleTranslation that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ArticleTranslationFindUniqueOrThrowArgs} args - Arguments to find a ArticleTranslation
     * @example
     * // Get one ArticleTranslation
     * const articleTranslation = await prisma.articleTranslation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ArticleTranslationFindUniqueOrThrowArgs>(args: SelectSubset<T, ArticleTranslationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ArticleTranslationClient<$Result.GetResult<Prisma.$ArticleTranslationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArticleTranslation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleTranslationFindFirstArgs} args - Arguments to find a ArticleTranslation
     * @example
     * // Get one ArticleTranslation
     * const articleTranslation = await prisma.articleTranslation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ArticleTranslationFindFirstArgs>(args?: SelectSubset<T, ArticleTranslationFindFirstArgs<ExtArgs>>): Prisma__ArticleTranslationClient<$Result.GetResult<Prisma.$ArticleTranslationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ArticleTranslation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleTranslationFindFirstOrThrowArgs} args - Arguments to find a ArticleTranslation
     * @example
     * // Get one ArticleTranslation
     * const articleTranslation = await prisma.articleTranslation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ArticleTranslationFindFirstOrThrowArgs>(args?: SelectSubset<T, ArticleTranslationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ArticleTranslationClient<$Result.GetResult<Prisma.$ArticleTranslationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ArticleTranslations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleTranslationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ArticleTranslations
     * const articleTranslations = await prisma.articleTranslation.findMany()
     * 
     * // Get first 10 ArticleTranslations
     * const articleTranslations = await prisma.articleTranslation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const articleTranslationWithIdOnly = await prisma.articleTranslation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ArticleTranslationFindManyArgs>(args?: SelectSubset<T, ArticleTranslationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleTranslationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ArticleTranslation.
     * @param {ArticleTranslationCreateArgs} args - Arguments to create a ArticleTranslation.
     * @example
     * // Create one ArticleTranslation
     * const ArticleTranslation = await prisma.articleTranslation.create({
     *   data: {
     *     // ... data to create a ArticleTranslation
     *   }
     * })
     * 
     */
    create<T extends ArticleTranslationCreateArgs>(args: SelectSubset<T, ArticleTranslationCreateArgs<ExtArgs>>): Prisma__ArticleTranslationClient<$Result.GetResult<Prisma.$ArticleTranslationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ArticleTranslations.
     * @param {ArticleTranslationCreateManyArgs} args - Arguments to create many ArticleTranslations.
     * @example
     * // Create many ArticleTranslations
     * const articleTranslation = await prisma.articleTranslation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ArticleTranslationCreateManyArgs>(args?: SelectSubset<T, ArticleTranslationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ArticleTranslations and returns the data saved in the database.
     * @param {ArticleTranslationCreateManyAndReturnArgs} args - Arguments to create many ArticleTranslations.
     * @example
     * // Create many ArticleTranslations
     * const articleTranslation = await prisma.articleTranslation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ArticleTranslations and only return the `id`
     * const articleTranslationWithIdOnly = await prisma.articleTranslation.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ArticleTranslationCreateManyAndReturnArgs>(args?: SelectSubset<T, ArticleTranslationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleTranslationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ArticleTranslation.
     * @param {ArticleTranslationDeleteArgs} args - Arguments to delete one ArticleTranslation.
     * @example
     * // Delete one ArticleTranslation
     * const ArticleTranslation = await prisma.articleTranslation.delete({
     *   where: {
     *     // ... filter to delete one ArticleTranslation
     *   }
     * })
     * 
     */
    delete<T extends ArticleTranslationDeleteArgs>(args: SelectSubset<T, ArticleTranslationDeleteArgs<ExtArgs>>): Prisma__ArticleTranslationClient<$Result.GetResult<Prisma.$ArticleTranslationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ArticleTranslation.
     * @param {ArticleTranslationUpdateArgs} args - Arguments to update one ArticleTranslation.
     * @example
     * // Update one ArticleTranslation
     * const articleTranslation = await prisma.articleTranslation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ArticleTranslationUpdateArgs>(args: SelectSubset<T, ArticleTranslationUpdateArgs<ExtArgs>>): Prisma__ArticleTranslationClient<$Result.GetResult<Prisma.$ArticleTranslationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ArticleTranslations.
     * @param {ArticleTranslationDeleteManyArgs} args - Arguments to filter ArticleTranslations to delete.
     * @example
     * // Delete a few ArticleTranslations
     * const { count } = await prisma.articleTranslation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ArticleTranslationDeleteManyArgs>(args?: SelectSubset<T, ArticleTranslationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArticleTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleTranslationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ArticleTranslations
     * const articleTranslation = await prisma.articleTranslation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ArticleTranslationUpdateManyArgs>(args: SelectSubset<T, ArticleTranslationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ArticleTranslations and returns the data updated in the database.
     * @param {ArticleTranslationUpdateManyAndReturnArgs} args - Arguments to update many ArticleTranslations.
     * @example
     * // Update many ArticleTranslations
     * const articleTranslation = await prisma.articleTranslation.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ArticleTranslations and only return the `id`
     * const articleTranslationWithIdOnly = await prisma.articleTranslation.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ArticleTranslationUpdateManyAndReturnArgs>(args: SelectSubset<T, ArticleTranslationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ArticleTranslationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ArticleTranslation.
     * @param {ArticleTranslationUpsertArgs} args - Arguments to update or create a ArticleTranslation.
     * @example
     * // Update or create a ArticleTranslation
     * const articleTranslation = await prisma.articleTranslation.upsert({
     *   create: {
     *     // ... data to create a ArticleTranslation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ArticleTranslation we want to update
     *   }
     * })
     */
    upsert<T extends ArticleTranslationUpsertArgs>(args: SelectSubset<T, ArticleTranslationUpsertArgs<ExtArgs>>): Prisma__ArticleTranslationClient<$Result.GetResult<Prisma.$ArticleTranslationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ArticleTranslations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleTranslationCountArgs} args - Arguments to filter ArticleTranslations to count.
     * @example
     * // Count the number of ArticleTranslations
     * const count = await prisma.articleTranslation.count({
     *   where: {
     *     // ... the filter for the ArticleTranslations we want to count
     *   }
     * })
    **/
    count<T extends ArticleTranslationCountArgs>(
      args?: Subset<T, ArticleTranslationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ArticleTranslationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ArticleTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleTranslationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ArticleTranslationAggregateArgs>(args: Subset<T, ArticleTranslationAggregateArgs>): Prisma.PrismaPromise<GetArticleTranslationAggregateType<T>>

    /**
     * Group by ArticleTranslation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ArticleTranslationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ArticleTranslationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ArticleTranslationGroupByArgs['orderBy'] }
        : { orderBy?: ArticleTranslationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ArticleTranslationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetArticleTranslationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ArticleTranslation model
   */
  readonly fields: ArticleTranslationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ArticleTranslation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ArticleTranslationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    article<T extends ArticleDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ArticleDefaultArgs<ExtArgs>>): Prisma__ArticleClient<$Result.GetResult<Prisma.$ArticlePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ArticleTranslation model
   */
  interface ArticleTranslationFieldRefs {
    readonly id: FieldRef<"ArticleTranslation", 'String'>
    readonly articleId: FieldRef<"ArticleTranslation", 'String'>
    readonly locale: FieldRef<"ArticleTranslation", 'String'>
    readonly title: FieldRef<"ArticleTranslation", 'String'>
    readonly excerpt: FieldRef<"ArticleTranslation", 'String'>
    readonly contentHtml: FieldRef<"ArticleTranslation", 'String'>
    readonly metaTitle: FieldRef<"ArticleTranslation", 'String'>
    readonly metaDescription: FieldRef<"ArticleTranslation", 'String'>
    readonly updatedAt: FieldRef<"ArticleTranslation", 'DateTime'>
    readonly expertQuote: FieldRef<"ArticleTranslation", 'String'>
    readonly keyFactsJson: FieldRef<"ArticleTranslation", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ArticleTranslation findUnique
   */
  export type ArticleTranslationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTranslation
     */
    select?: ArticleTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTranslation
     */
    omit?: ArticleTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ArticleTranslation to fetch.
     */
    where: ArticleTranslationWhereUniqueInput
  }

  /**
   * ArticleTranslation findUniqueOrThrow
   */
  export type ArticleTranslationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTranslation
     */
    select?: ArticleTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTranslation
     */
    omit?: ArticleTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ArticleTranslation to fetch.
     */
    where: ArticleTranslationWhereUniqueInput
  }

  /**
   * ArticleTranslation findFirst
   */
  export type ArticleTranslationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTranslation
     */
    select?: ArticleTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTranslation
     */
    omit?: ArticleTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ArticleTranslation to fetch.
     */
    where?: ArticleTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleTranslations to fetch.
     */
    orderBy?: ArticleTranslationOrderByWithRelationInput | ArticleTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleTranslations.
     */
    cursor?: ArticleTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleTranslations.
     */
    distinct?: ArticleTranslationScalarFieldEnum | ArticleTranslationScalarFieldEnum[]
  }

  /**
   * ArticleTranslation findFirstOrThrow
   */
  export type ArticleTranslationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTranslation
     */
    select?: ArticleTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTranslation
     */
    omit?: ArticleTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ArticleTranslation to fetch.
     */
    where?: ArticleTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleTranslations to fetch.
     */
    orderBy?: ArticleTranslationOrderByWithRelationInput | ArticleTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ArticleTranslations.
     */
    cursor?: ArticleTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleTranslations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ArticleTranslations.
     */
    distinct?: ArticleTranslationScalarFieldEnum | ArticleTranslationScalarFieldEnum[]
  }

  /**
   * ArticleTranslation findMany
   */
  export type ArticleTranslationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTranslation
     */
    select?: ArticleTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTranslation
     */
    omit?: ArticleTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTranslationInclude<ExtArgs> | null
    /**
     * Filter, which ArticleTranslations to fetch.
     */
    where?: ArticleTranslationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ArticleTranslations to fetch.
     */
    orderBy?: ArticleTranslationOrderByWithRelationInput | ArticleTranslationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ArticleTranslations.
     */
    cursor?: ArticleTranslationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ArticleTranslations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ArticleTranslations.
     */
    skip?: number
    distinct?: ArticleTranslationScalarFieldEnum | ArticleTranslationScalarFieldEnum[]
  }

  /**
   * ArticleTranslation create
   */
  export type ArticleTranslationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTranslation
     */
    select?: ArticleTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTranslation
     */
    omit?: ArticleTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTranslationInclude<ExtArgs> | null
    /**
     * The data needed to create a ArticleTranslation.
     */
    data: XOR<ArticleTranslationCreateInput, ArticleTranslationUncheckedCreateInput>
  }

  /**
   * ArticleTranslation createMany
   */
  export type ArticleTranslationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ArticleTranslations.
     */
    data: ArticleTranslationCreateManyInput | ArticleTranslationCreateManyInput[]
  }

  /**
   * ArticleTranslation createManyAndReturn
   */
  export type ArticleTranslationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTranslation
     */
    select?: ArticleTranslationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTranslation
     */
    omit?: ArticleTranslationOmit<ExtArgs> | null
    /**
     * The data used to create many ArticleTranslations.
     */
    data: ArticleTranslationCreateManyInput | ArticleTranslationCreateManyInput[]
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTranslationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArticleTranslation update
   */
  export type ArticleTranslationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTranslation
     */
    select?: ArticleTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTranslation
     */
    omit?: ArticleTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTranslationInclude<ExtArgs> | null
    /**
     * The data needed to update a ArticleTranslation.
     */
    data: XOR<ArticleTranslationUpdateInput, ArticleTranslationUncheckedUpdateInput>
    /**
     * Choose, which ArticleTranslation to update.
     */
    where: ArticleTranslationWhereUniqueInput
  }

  /**
   * ArticleTranslation updateMany
   */
  export type ArticleTranslationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ArticleTranslations.
     */
    data: XOR<ArticleTranslationUpdateManyMutationInput, ArticleTranslationUncheckedUpdateManyInput>
    /**
     * Filter which ArticleTranslations to update
     */
    where?: ArticleTranslationWhereInput
    /**
     * Limit how many ArticleTranslations to update.
     */
    limit?: number
  }

  /**
   * ArticleTranslation updateManyAndReturn
   */
  export type ArticleTranslationUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTranslation
     */
    select?: ArticleTranslationSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTranslation
     */
    omit?: ArticleTranslationOmit<ExtArgs> | null
    /**
     * The data used to update ArticleTranslations.
     */
    data: XOR<ArticleTranslationUpdateManyMutationInput, ArticleTranslationUncheckedUpdateManyInput>
    /**
     * Filter which ArticleTranslations to update
     */
    where?: ArticleTranslationWhereInput
    /**
     * Limit how many ArticleTranslations to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTranslationIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * ArticleTranslation upsert
   */
  export type ArticleTranslationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTranslation
     */
    select?: ArticleTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTranslation
     */
    omit?: ArticleTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTranslationInclude<ExtArgs> | null
    /**
     * The filter to search for the ArticleTranslation to update in case it exists.
     */
    where: ArticleTranslationWhereUniqueInput
    /**
     * In case the ArticleTranslation found by the `where` argument doesn't exist, create a new ArticleTranslation with this data.
     */
    create: XOR<ArticleTranslationCreateInput, ArticleTranslationUncheckedCreateInput>
    /**
     * In case the ArticleTranslation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ArticleTranslationUpdateInput, ArticleTranslationUncheckedUpdateInput>
  }

  /**
   * ArticleTranslation delete
   */
  export type ArticleTranslationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTranslation
     */
    select?: ArticleTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTranslation
     */
    omit?: ArticleTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTranslationInclude<ExtArgs> | null
    /**
     * Filter which ArticleTranslation to delete.
     */
    where: ArticleTranslationWhereUniqueInput
  }

  /**
   * ArticleTranslation deleteMany
   */
  export type ArticleTranslationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ArticleTranslations to delete
     */
    where?: ArticleTranslationWhereInput
    /**
     * Limit how many ArticleTranslations to delete.
     */
    limit?: number
  }

  /**
   * ArticleTranslation without action
   */
  export type ArticleTranslationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ArticleTranslation
     */
    select?: ArticleTranslationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ArticleTranslation
     */
    omit?: ArticleTranslationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ArticleTranslationInclude<ExtArgs> | null
  }


  /**
   * Model NewsletterSubscription
   */

  export type AggregateNewsletterSubscription = {
    _count: NewsletterSubscriptionCountAggregateOutputType | null
    _min: NewsletterSubscriptionMinAggregateOutputType | null
    _max: NewsletterSubscriptionMaxAggregateOutputType | null
  }

  export type NewsletterSubscriptionMinAggregateOutputType = {
    id: string | null
    email: string | null
    source: string | null
    leadMagnet: string | null
    createdAt: Date | null
  }

  export type NewsletterSubscriptionMaxAggregateOutputType = {
    id: string | null
    email: string | null
    source: string | null
    leadMagnet: string | null
    createdAt: Date | null
  }

  export type NewsletterSubscriptionCountAggregateOutputType = {
    id: number
    email: number
    source: number
    leadMagnet: number
    createdAt: number
    _all: number
  }


  export type NewsletterSubscriptionMinAggregateInputType = {
    id?: true
    email?: true
    source?: true
    leadMagnet?: true
    createdAt?: true
  }

  export type NewsletterSubscriptionMaxAggregateInputType = {
    id?: true
    email?: true
    source?: true
    leadMagnet?: true
    createdAt?: true
  }

  export type NewsletterSubscriptionCountAggregateInputType = {
    id?: true
    email?: true
    source?: true
    leadMagnet?: true
    createdAt?: true
    _all?: true
  }

  export type NewsletterSubscriptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsletterSubscription to aggregate.
     */
    where?: NewsletterSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscriptions to fetch.
     */
    orderBy?: NewsletterSubscriptionOrderByWithRelationInput | NewsletterSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NewsletterSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NewsletterSubscriptions
    **/
    _count?: true | NewsletterSubscriptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NewsletterSubscriptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NewsletterSubscriptionMaxAggregateInputType
  }

  export type GetNewsletterSubscriptionAggregateType<T extends NewsletterSubscriptionAggregateArgs> = {
        [P in keyof T & keyof AggregateNewsletterSubscription]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNewsletterSubscription[P]>
      : GetScalarType<T[P], AggregateNewsletterSubscription[P]>
  }




  export type NewsletterSubscriptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewsletterSubscriptionWhereInput
    orderBy?: NewsletterSubscriptionOrderByWithAggregationInput | NewsletterSubscriptionOrderByWithAggregationInput[]
    by: NewsletterSubscriptionScalarFieldEnum[] | NewsletterSubscriptionScalarFieldEnum
    having?: NewsletterSubscriptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NewsletterSubscriptionCountAggregateInputType | true
    _min?: NewsletterSubscriptionMinAggregateInputType
    _max?: NewsletterSubscriptionMaxAggregateInputType
  }

  export type NewsletterSubscriptionGroupByOutputType = {
    id: string
    email: string
    source: string
    leadMagnet: string | null
    createdAt: Date
    _count: NewsletterSubscriptionCountAggregateOutputType | null
    _min: NewsletterSubscriptionMinAggregateOutputType | null
    _max: NewsletterSubscriptionMaxAggregateOutputType | null
  }

  type GetNewsletterSubscriptionGroupByPayload<T extends NewsletterSubscriptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NewsletterSubscriptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NewsletterSubscriptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NewsletterSubscriptionGroupByOutputType[P]>
            : GetScalarType<T[P], NewsletterSubscriptionGroupByOutputType[P]>
        }
      >
    >


  export type NewsletterSubscriptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    source?: boolean
    leadMagnet?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["newsletterSubscription"]>

  export type NewsletterSubscriptionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    source?: boolean
    leadMagnet?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["newsletterSubscription"]>

  export type NewsletterSubscriptionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    source?: boolean
    leadMagnet?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["newsletterSubscription"]>

  export type NewsletterSubscriptionSelectScalar = {
    id?: boolean
    email?: boolean
    source?: boolean
    leadMagnet?: boolean
    createdAt?: boolean
  }

  export type NewsletterSubscriptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "source" | "leadMagnet" | "createdAt", ExtArgs["result"]["newsletterSubscription"]>

  export type $NewsletterSubscriptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NewsletterSubscription"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      source: string
      leadMagnet: string | null
      createdAt: Date
    }, ExtArgs["result"]["newsletterSubscription"]>
    composites: {}
  }

  type NewsletterSubscriptionGetPayload<S extends boolean | null | undefined | NewsletterSubscriptionDefaultArgs> = $Result.GetResult<Prisma.$NewsletterSubscriptionPayload, S>

  type NewsletterSubscriptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NewsletterSubscriptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NewsletterSubscriptionCountAggregateInputType | true
    }

  export interface NewsletterSubscriptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NewsletterSubscription'], meta: { name: 'NewsletterSubscription' } }
    /**
     * Find zero or one NewsletterSubscription that matches the filter.
     * @param {NewsletterSubscriptionFindUniqueArgs} args - Arguments to find a NewsletterSubscription
     * @example
     * // Get one NewsletterSubscription
     * const newsletterSubscription = await prisma.newsletterSubscription.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NewsletterSubscriptionFindUniqueArgs>(args: SelectSubset<T, NewsletterSubscriptionFindUniqueArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NewsletterSubscription that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NewsletterSubscriptionFindUniqueOrThrowArgs} args - Arguments to find a NewsletterSubscription
     * @example
     * // Get one NewsletterSubscription
     * const newsletterSubscription = await prisma.newsletterSubscription.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NewsletterSubscriptionFindUniqueOrThrowArgs>(args: SelectSubset<T, NewsletterSubscriptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsletterSubscription that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriptionFindFirstArgs} args - Arguments to find a NewsletterSubscription
     * @example
     * // Get one NewsletterSubscription
     * const newsletterSubscription = await prisma.newsletterSubscription.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NewsletterSubscriptionFindFirstArgs>(args?: SelectSubset<T, NewsletterSubscriptionFindFirstArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsletterSubscription that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriptionFindFirstOrThrowArgs} args - Arguments to find a NewsletterSubscription
     * @example
     * // Get one NewsletterSubscription
     * const newsletterSubscription = await prisma.newsletterSubscription.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NewsletterSubscriptionFindFirstOrThrowArgs>(args?: SelectSubset<T, NewsletterSubscriptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NewsletterSubscriptions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NewsletterSubscriptions
     * const newsletterSubscriptions = await prisma.newsletterSubscription.findMany()
     * 
     * // Get first 10 NewsletterSubscriptions
     * const newsletterSubscriptions = await prisma.newsletterSubscription.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const newsletterSubscriptionWithIdOnly = await prisma.newsletterSubscription.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NewsletterSubscriptionFindManyArgs>(args?: SelectSubset<T, NewsletterSubscriptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NewsletterSubscription.
     * @param {NewsletterSubscriptionCreateArgs} args - Arguments to create a NewsletterSubscription.
     * @example
     * // Create one NewsletterSubscription
     * const NewsletterSubscription = await prisma.newsletterSubscription.create({
     *   data: {
     *     // ... data to create a NewsletterSubscription
     *   }
     * })
     * 
     */
    create<T extends NewsletterSubscriptionCreateArgs>(args: SelectSubset<T, NewsletterSubscriptionCreateArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NewsletterSubscriptions.
     * @param {NewsletterSubscriptionCreateManyArgs} args - Arguments to create many NewsletterSubscriptions.
     * @example
     * // Create many NewsletterSubscriptions
     * const newsletterSubscription = await prisma.newsletterSubscription.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NewsletterSubscriptionCreateManyArgs>(args?: SelectSubset<T, NewsletterSubscriptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NewsletterSubscriptions and returns the data saved in the database.
     * @param {NewsletterSubscriptionCreateManyAndReturnArgs} args - Arguments to create many NewsletterSubscriptions.
     * @example
     * // Create many NewsletterSubscriptions
     * const newsletterSubscription = await prisma.newsletterSubscription.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NewsletterSubscriptions and only return the `id`
     * const newsletterSubscriptionWithIdOnly = await prisma.newsletterSubscription.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NewsletterSubscriptionCreateManyAndReturnArgs>(args?: SelectSubset<T, NewsletterSubscriptionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NewsletterSubscription.
     * @param {NewsletterSubscriptionDeleteArgs} args - Arguments to delete one NewsletterSubscription.
     * @example
     * // Delete one NewsletterSubscription
     * const NewsletterSubscription = await prisma.newsletterSubscription.delete({
     *   where: {
     *     // ... filter to delete one NewsletterSubscription
     *   }
     * })
     * 
     */
    delete<T extends NewsletterSubscriptionDeleteArgs>(args: SelectSubset<T, NewsletterSubscriptionDeleteArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NewsletterSubscription.
     * @param {NewsletterSubscriptionUpdateArgs} args - Arguments to update one NewsletterSubscription.
     * @example
     * // Update one NewsletterSubscription
     * const newsletterSubscription = await prisma.newsletterSubscription.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NewsletterSubscriptionUpdateArgs>(args: SelectSubset<T, NewsletterSubscriptionUpdateArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NewsletterSubscriptions.
     * @param {NewsletterSubscriptionDeleteManyArgs} args - Arguments to filter NewsletterSubscriptions to delete.
     * @example
     * // Delete a few NewsletterSubscriptions
     * const { count } = await prisma.newsletterSubscription.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NewsletterSubscriptionDeleteManyArgs>(args?: SelectSubset<T, NewsletterSubscriptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsletterSubscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NewsletterSubscriptions
     * const newsletterSubscription = await prisma.newsletterSubscription.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NewsletterSubscriptionUpdateManyArgs>(args: SelectSubset<T, NewsletterSubscriptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsletterSubscriptions and returns the data updated in the database.
     * @param {NewsletterSubscriptionUpdateManyAndReturnArgs} args - Arguments to update many NewsletterSubscriptions.
     * @example
     * // Update many NewsletterSubscriptions
     * const newsletterSubscription = await prisma.newsletterSubscription.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NewsletterSubscriptions and only return the `id`
     * const newsletterSubscriptionWithIdOnly = await prisma.newsletterSubscription.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NewsletterSubscriptionUpdateManyAndReturnArgs>(args: SelectSubset<T, NewsletterSubscriptionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NewsletterSubscription.
     * @param {NewsletterSubscriptionUpsertArgs} args - Arguments to update or create a NewsletterSubscription.
     * @example
     * // Update or create a NewsletterSubscription
     * const newsletterSubscription = await prisma.newsletterSubscription.upsert({
     *   create: {
     *     // ... data to create a NewsletterSubscription
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NewsletterSubscription we want to update
     *   }
     * })
     */
    upsert<T extends NewsletterSubscriptionUpsertArgs>(args: SelectSubset<T, NewsletterSubscriptionUpsertArgs<ExtArgs>>): Prisma__NewsletterSubscriptionClient<$Result.GetResult<Prisma.$NewsletterSubscriptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NewsletterSubscriptions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriptionCountArgs} args - Arguments to filter NewsletterSubscriptions to count.
     * @example
     * // Count the number of NewsletterSubscriptions
     * const count = await prisma.newsletterSubscription.count({
     *   where: {
     *     // ... the filter for the NewsletterSubscriptions we want to count
     *   }
     * })
    **/
    count<T extends NewsletterSubscriptionCountArgs>(
      args?: Subset<T, NewsletterSubscriptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NewsletterSubscriptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NewsletterSubscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NewsletterSubscriptionAggregateArgs>(args: Subset<T, NewsletterSubscriptionAggregateArgs>): Prisma.PrismaPromise<GetNewsletterSubscriptionAggregateType<T>>

    /**
     * Group by NewsletterSubscription.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsletterSubscriptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NewsletterSubscriptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NewsletterSubscriptionGroupByArgs['orderBy'] }
        : { orderBy?: NewsletterSubscriptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NewsletterSubscriptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNewsletterSubscriptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NewsletterSubscription model
   */
  readonly fields: NewsletterSubscriptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NewsletterSubscription.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NewsletterSubscriptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NewsletterSubscription model
   */
  interface NewsletterSubscriptionFieldRefs {
    readonly id: FieldRef<"NewsletterSubscription", 'String'>
    readonly email: FieldRef<"NewsletterSubscription", 'String'>
    readonly source: FieldRef<"NewsletterSubscription", 'String'>
    readonly leadMagnet: FieldRef<"NewsletterSubscription", 'String'>
    readonly createdAt: FieldRef<"NewsletterSubscription", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NewsletterSubscription findUnique
   */
  export type NewsletterSubscriptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscription to fetch.
     */
    where: NewsletterSubscriptionWhereUniqueInput
  }

  /**
   * NewsletterSubscription findUniqueOrThrow
   */
  export type NewsletterSubscriptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscription to fetch.
     */
    where: NewsletterSubscriptionWhereUniqueInput
  }

  /**
   * NewsletterSubscription findFirst
   */
  export type NewsletterSubscriptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscription to fetch.
     */
    where?: NewsletterSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscriptions to fetch.
     */
    orderBy?: NewsletterSubscriptionOrderByWithRelationInput | NewsletterSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsletterSubscriptions.
     */
    cursor?: NewsletterSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsletterSubscriptions.
     */
    distinct?: NewsletterSubscriptionScalarFieldEnum | NewsletterSubscriptionScalarFieldEnum[]
  }

  /**
   * NewsletterSubscription findFirstOrThrow
   */
  export type NewsletterSubscriptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscription to fetch.
     */
    where?: NewsletterSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscriptions to fetch.
     */
    orderBy?: NewsletterSubscriptionOrderByWithRelationInput | NewsletterSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsletterSubscriptions.
     */
    cursor?: NewsletterSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscriptions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsletterSubscriptions.
     */
    distinct?: NewsletterSubscriptionScalarFieldEnum | NewsletterSubscriptionScalarFieldEnum[]
  }

  /**
   * NewsletterSubscription findMany
   */
  export type NewsletterSubscriptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * Filter, which NewsletterSubscriptions to fetch.
     */
    where?: NewsletterSubscriptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsletterSubscriptions to fetch.
     */
    orderBy?: NewsletterSubscriptionOrderByWithRelationInput | NewsletterSubscriptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NewsletterSubscriptions.
     */
    cursor?: NewsletterSubscriptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsletterSubscriptions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsletterSubscriptions.
     */
    skip?: number
    distinct?: NewsletterSubscriptionScalarFieldEnum | NewsletterSubscriptionScalarFieldEnum[]
  }

  /**
   * NewsletterSubscription create
   */
  export type NewsletterSubscriptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * The data needed to create a NewsletterSubscription.
     */
    data: XOR<NewsletterSubscriptionCreateInput, NewsletterSubscriptionUncheckedCreateInput>
  }

  /**
   * NewsletterSubscription createMany
   */
  export type NewsletterSubscriptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NewsletterSubscriptions.
     */
    data: NewsletterSubscriptionCreateManyInput | NewsletterSubscriptionCreateManyInput[]
  }

  /**
   * NewsletterSubscription createManyAndReturn
   */
  export type NewsletterSubscriptionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * The data used to create many NewsletterSubscriptions.
     */
    data: NewsletterSubscriptionCreateManyInput | NewsletterSubscriptionCreateManyInput[]
  }

  /**
   * NewsletterSubscription update
   */
  export type NewsletterSubscriptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * The data needed to update a NewsletterSubscription.
     */
    data: XOR<NewsletterSubscriptionUpdateInput, NewsletterSubscriptionUncheckedUpdateInput>
    /**
     * Choose, which NewsletterSubscription to update.
     */
    where: NewsletterSubscriptionWhereUniqueInput
  }

  /**
   * NewsletterSubscription updateMany
   */
  export type NewsletterSubscriptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NewsletterSubscriptions.
     */
    data: XOR<NewsletterSubscriptionUpdateManyMutationInput, NewsletterSubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which NewsletterSubscriptions to update
     */
    where?: NewsletterSubscriptionWhereInput
    /**
     * Limit how many NewsletterSubscriptions to update.
     */
    limit?: number
  }

  /**
   * NewsletterSubscription updateManyAndReturn
   */
  export type NewsletterSubscriptionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * The data used to update NewsletterSubscriptions.
     */
    data: XOR<NewsletterSubscriptionUpdateManyMutationInput, NewsletterSubscriptionUncheckedUpdateManyInput>
    /**
     * Filter which NewsletterSubscriptions to update
     */
    where?: NewsletterSubscriptionWhereInput
    /**
     * Limit how many NewsletterSubscriptions to update.
     */
    limit?: number
  }

  /**
   * NewsletterSubscription upsert
   */
  export type NewsletterSubscriptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * The filter to search for the NewsletterSubscription to update in case it exists.
     */
    where: NewsletterSubscriptionWhereUniqueInput
    /**
     * In case the NewsletterSubscription found by the `where` argument doesn't exist, create a new NewsletterSubscription with this data.
     */
    create: XOR<NewsletterSubscriptionCreateInput, NewsletterSubscriptionUncheckedCreateInput>
    /**
     * In case the NewsletterSubscription was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NewsletterSubscriptionUpdateInput, NewsletterSubscriptionUncheckedUpdateInput>
  }

  /**
   * NewsletterSubscription delete
   */
  export type NewsletterSubscriptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
    /**
     * Filter which NewsletterSubscription to delete.
     */
    where: NewsletterSubscriptionWhereUniqueInput
  }

  /**
   * NewsletterSubscription deleteMany
   */
  export type NewsletterSubscriptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsletterSubscriptions to delete
     */
    where?: NewsletterSubscriptionWhereInput
    /**
     * Limit how many NewsletterSubscriptions to delete.
     */
    limit?: number
  }

  /**
   * NewsletterSubscription without action
   */
  export type NewsletterSubscriptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsletterSubscription
     */
    select?: NewsletterSubscriptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsletterSubscription
     */
    omit?: NewsletterSubscriptionOmit<ExtArgs> | null
  }


  /**
   * Model MarketSnapshot
   */

  export type AggregateMarketSnapshot = {
    _count: MarketSnapshotCountAggregateOutputType | null
    _avg: MarketSnapshotAvgAggregateOutputType | null
    _sum: MarketSnapshotSumAggregateOutputType | null
    _min: MarketSnapshotMinAggregateOutputType | null
    _max: MarketSnapshotMaxAggregateOutputType | null
  }

  export type MarketSnapshotAvgAggregateOutputType = {
    id: number | null
  }

  export type MarketSnapshotSumAggregateOutputType = {
    id: number | null
  }

  export type MarketSnapshotMinAggregateOutputType = {
    id: number | null
    createdAt: string | null
    payloadJson: string | null
  }

  export type MarketSnapshotMaxAggregateOutputType = {
    id: number | null
    createdAt: string | null
    payloadJson: string | null
  }

  export type MarketSnapshotCountAggregateOutputType = {
    id: number
    createdAt: number
    payloadJson: number
    _all: number
  }


  export type MarketSnapshotAvgAggregateInputType = {
    id?: true
  }

  export type MarketSnapshotSumAggregateInputType = {
    id?: true
  }

  export type MarketSnapshotMinAggregateInputType = {
    id?: true
    createdAt?: true
    payloadJson?: true
  }

  export type MarketSnapshotMaxAggregateInputType = {
    id?: true
    createdAt?: true
    payloadJson?: true
  }

  export type MarketSnapshotCountAggregateInputType = {
    id?: true
    createdAt?: true
    payloadJson?: true
    _all?: true
  }

  export type MarketSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MarketSnapshot to aggregate.
     */
    where?: MarketSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketSnapshots to fetch.
     */
    orderBy?: MarketSnapshotOrderByWithRelationInput | MarketSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MarketSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MarketSnapshots
    **/
    _count?: true | MarketSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MarketSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MarketSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MarketSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MarketSnapshotMaxAggregateInputType
  }

  export type GetMarketSnapshotAggregateType<T extends MarketSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateMarketSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMarketSnapshot[P]>
      : GetScalarType<T[P], AggregateMarketSnapshot[P]>
  }




  export type MarketSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MarketSnapshotWhereInput
    orderBy?: MarketSnapshotOrderByWithAggregationInput | MarketSnapshotOrderByWithAggregationInput[]
    by: MarketSnapshotScalarFieldEnum[] | MarketSnapshotScalarFieldEnum
    having?: MarketSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MarketSnapshotCountAggregateInputType | true
    _avg?: MarketSnapshotAvgAggregateInputType
    _sum?: MarketSnapshotSumAggregateInputType
    _min?: MarketSnapshotMinAggregateInputType
    _max?: MarketSnapshotMaxAggregateInputType
  }

  export type MarketSnapshotGroupByOutputType = {
    id: number
    createdAt: string
    payloadJson: string
    _count: MarketSnapshotCountAggregateOutputType | null
    _avg: MarketSnapshotAvgAggregateOutputType | null
    _sum: MarketSnapshotSumAggregateOutputType | null
    _min: MarketSnapshotMinAggregateOutputType | null
    _max: MarketSnapshotMaxAggregateOutputType | null
  }

  type GetMarketSnapshotGroupByPayload<T extends MarketSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MarketSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MarketSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MarketSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], MarketSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type MarketSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    payloadJson?: boolean
  }, ExtArgs["result"]["marketSnapshot"]>

  export type MarketSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    payloadJson?: boolean
  }, ExtArgs["result"]["marketSnapshot"]>

  export type MarketSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    payloadJson?: boolean
  }, ExtArgs["result"]["marketSnapshot"]>

  export type MarketSnapshotSelectScalar = {
    id?: boolean
    createdAt?: boolean
    payloadJson?: boolean
  }

  export type MarketSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "payloadJson", ExtArgs["result"]["marketSnapshot"]>

  export type $MarketSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MarketSnapshot"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: string
      payloadJson: string
    }, ExtArgs["result"]["marketSnapshot"]>
    composites: {}
  }

  type MarketSnapshotGetPayload<S extends boolean | null | undefined | MarketSnapshotDefaultArgs> = $Result.GetResult<Prisma.$MarketSnapshotPayload, S>

  type MarketSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MarketSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MarketSnapshotCountAggregateInputType | true
    }

  export interface MarketSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MarketSnapshot'], meta: { name: 'MarketSnapshot' } }
    /**
     * Find zero or one MarketSnapshot that matches the filter.
     * @param {MarketSnapshotFindUniqueArgs} args - Arguments to find a MarketSnapshot
     * @example
     * // Get one MarketSnapshot
     * const marketSnapshot = await prisma.marketSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MarketSnapshotFindUniqueArgs>(args: SelectSubset<T, MarketSnapshotFindUniqueArgs<ExtArgs>>): Prisma__MarketSnapshotClient<$Result.GetResult<Prisma.$MarketSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MarketSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MarketSnapshotFindUniqueOrThrowArgs} args - Arguments to find a MarketSnapshot
     * @example
     * // Get one MarketSnapshot
     * const marketSnapshot = await prisma.marketSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MarketSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, MarketSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MarketSnapshotClient<$Result.GetResult<Prisma.$MarketSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MarketSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketSnapshotFindFirstArgs} args - Arguments to find a MarketSnapshot
     * @example
     * // Get one MarketSnapshot
     * const marketSnapshot = await prisma.marketSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MarketSnapshotFindFirstArgs>(args?: SelectSubset<T, MarketSnapshotFindFirstArgs<ExtArgs>>): Prisma__MarketSnapshotClient<$Result.GetResult<Prisma.$MarketSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MarketSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketSnapshotFindFirstOrThrowArgs} args - Arguments to find a MarketSnapshot
     * @example
     * // Get one MarketSnapshot
     * const marketSnapshot = await prisma.marketSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MarketSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, MarketSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__MarketSnapshotClient<$Result.GetResult<Prisma.$MarketSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MarketSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MarketSnapshots
     * const marketSnapshots = await prisma.marketSnapshot.findMany()
     * 
     * // Get first 10 MarketSnapshots
     * const marketSnapshots = await prisma.marketSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const marketSnapshotWithIdOnly = await prisma.marketSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MarketSnapshotFindManyArgs>(args?: SelectSubset<T, MarketSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MarketSnapshot.
     * @param {MarketSnapshotCreateArgs} args - Arguments to create a MarketSnapshot.
     * @example
     * // Create one MarketSnapshot
     * const MarketSnapshot = await prisma.marketSnapshot.create({
     *   data: {
     *     // ... data to create a MarketSnapshot
     *   }
     * })
     * 
     */
    create<T extends MarketSnapshotCreateArgs>(args: SelectSubset<T, MarketSnapshotCreateArgs<ExtArgs>>): Prisma__MarketSnapshotClient<$Result.GetResult<Prisma.$MarketSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MarketSnapshots.
     * @param {MarketSnapshotCreateManyArgs} args - Arguments to create many MarketSnapshots.
     * @example
     * // Create many MarketSnapshots
     * const marketSnapshot = await prisma.marketSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MarketSnapshotCreateManyArgs>(args?: SelectSubset<T, MarketSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MarketSnapshots and returns the data saved in the database.
     * @param {MarketSnapshotCreateManyAndReturnArgs} args - Arguments to create many MarketSnapshots.
     * @example
     * // Create many MarketSnapshots
     * const marketSnapshot = await prisma.marketSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MarketSnapshots and only return the `id`
     * const marketSnapshotWithIdOnly = await prisma.marketSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MarketSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, MarketSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MarketSnapshot.
     * @param {MarketSnapshotDeleteArgs} args - Arguments to delete one MarketSnapshot.
     * @example
     * // Delete one MarketSnapshot
     * const MarketSnapshot = await prisma.marketSnapshot.delete({
     *   where: {
     *     // ... filter to delete one MarketSnapshot
     *   }
     * })
     * 
     */
    delete<T extends MarketSnapshotDeleteArgs>(args: SelectSubset<T, MarketSnapshotDeleteArgs<ExtArgs>>): Prisma__MarketSnapshotClient<$Result.GetResult<Prisma.$MarketSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MarketSnapshot.
     * @param {MarketSnapshotUpdateArgs} args - Arguments to update one MarketSnapshot.
     * @example
     * // Update one MarketSnapshot
     * const marketSnapshot = await prisma.marketSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MarketSnapshotUpdateArgs>(args: SelectSubset<T, MarketSnapshotUpdateArgs<ExtArgs>>): Prisma__MarketSnapshotClient<$Result.GetResult<Prisma.$MarketSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MarketSnapshots.
     * @param {MarketSnapshotDeleteManyArgs} args - Arguments to filter MarketSnapshots to delete.
     * @example
     * // Delete a few MarketSnapshots
     * const { count } = await prisma.marketSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MarketSnapshotDeleteManyArgs>(args?: SelectSubset<T, MarketSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MarketSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MarketSnapshots
     * const marketSnapshot = await prisma.marketSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MarketSnapshotUpdateManyArgs>(args: SelectSubset<T, MarketSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MarketSnapshots and returns the data updated in the database.
     * @param {MarketSnapshotUpdateManyAndReturnArgs} args - Arguments to update many MarketSnapshots.
     * @example
     * // Update many MarketSnapshots
     * const marketSnapshot = await prisma.marketSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MarketSnapshots and only return the `id`
     * const marketSnapshotWithIdOnly = await prisma.marketSnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MarketSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, MarketSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MarketSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MarketSnapshot.
     * @param {MarketSnapshotUpsertArgs} args - Arguments to update or create a MarketSnapshot.
     * @example
     * // Update or create a MarketSnapshot
     * const marketSnapshot = await prisma.marketSnapshot.upsert({
     *   create: {
     *     // ... data to create a MarketSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MarketSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends MarketSnapshotUpsertArgs>(args: SelectSubset<T, MarketSnapshotUpsertArgs<ExtArgs>>): Prisma__MarketSnapshotClient<$Result.GetResult<Prisma.$MarketSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MarketSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketSnapshotCountArgs} args - Arguments to filter MarketSnapshots to count.
     * @example
     * // Count the number of MarketSnapshots
     * const count = await prisma.marketSnapshot.count({
     *   where: {
     *     // ... the filter for the MarketSnapshots we want to count
     *   }
     * })
    **/
    count<T extends MarketSnapshotCountArgs>(
      args?: Subset<T, MarketSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MarketSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MarketSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MarketSnapshotAggregateArgs>(args: Subset<T, MarketSnapshotAggregateArgs>): Prisma.PrismaPromise<GetMarketSnapshotAggregateType<T>>

    /**
     * Group by MarketSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MarketSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MarketSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MarketSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: MarketSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MarketSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMarketSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MarketSnapshot model
   */
  readonly fields: MarketSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MarketSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MarketSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MarketSnapshot model
   */
  interface MarketSnapshotFieldRefs {
    readonly id: FieldRef<"MarketSnapshot", 'Int'>
    readonly createdAt: FieldRef<"MarketSnapshot", 'String'>
    readonly payloadJson: FieldRef<"MarketSnapshot", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MarketSnapshot findUnique
   */
  export type MarketSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketSnapshot
     */
    select?: MarketSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketSnapshot
     */
    omit?: MarketSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which MarketSnapshot to fetch.
     */
    where: MarketSnapshotWhereUniqueInput
  }

  /**
   * MarketSnapshot findUniqueOrThrow
   */
  export type MarketSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketSnapshot
     */
    select?: MarketSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketSnapshot
     */
    omit?: MarketSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which MarketSnapshot to fetch.
     */
    where: MarketSnapshotWhereUniqueInput
  }

  /**
   * MarketSnapshot findFirst
   */
  export type MarketSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketSnapshot
     */
    select?: MarketSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketSnapshot
     */
    omit?: MarketSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which MarketSnapshot to fetch.
     */
    where?: MarketSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketSnapshots to fetch.
     */
    orderBy?: MarketSnapshotOrderByWithRelationInput | MarketSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MarketSnapshots.
     */
    cursor?: MarketSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MarketSnapshots.
     */
    distinct?: MarketSnapshotScalarFieldEnum | MarketSnapshotScalarFieldEnum[]
  }

  /**
   * MarketSnapshot findFirstOrThrow
   */
  export type MarketSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketSnapshot
     */
    select?: MarketSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketSnapshot
     */
    omit?: MarketSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which MarketSnapshot to fetch.
     */
    where?: MarketSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketSnapshots to fetch.
     */
    orderBy?: MarketSnapshotOrderByWithRelationInput | MarketSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MarketSnapshots.
     */
    cursor?: MarketSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MarketSnapshots.
     */
    distinct?: MarketSnapshotScalarFieldEnum | MarketSnapshotScalarFieldEnum[]
  }

  /**
   * MarketSnapshot findMany
   */
  export type MarketSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketSnapshot
     */
    select?: MarketSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketSnapshot
     */
    omit?: MarketSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which MarketSnapshots to fetch.
     */
    where?: MarketSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MarketSnapshots to fetch.
     */
    orderBy?: MarketSnapshotOrderByWithRelationInput | MarketSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MarketSnapshots.
     */
    cursor?: MarketSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MarketSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MarketSnapshots.
     */
    skip?: number
    distinct?: MarketSnapshotScalarFieldEnum | MarketSnapshotScalarFieldEnum[]
  }

  /**
   * MarketSnapshot create
   */
  export type MarketSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketSnapshot
     */
    select?: MarketSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketSnapshot
     */
    omit?: MarketSnapshotOmit<ExtArgs> | null
    /**
     * The data needed to create a MarketSnapshot.
     */
    data: XOR<MarketSnapshotCreateInput, MarketSnapshotUncheckedCreateInput>
  }

  /**
   * MarketSnapshot createMany
   */
  export type MarketSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MarketSnapshots.
     */
    data: MarketSnapshotCreateManyInput | MarketSnapshotCreateManyInput[]
  }

  /**
   * MarketSnapshot createManyAndReturn
   */
  export type MarketSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketSnapshot
     */
    select?: MarketSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MarketSnapshot
     */
    omit?: MarketSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many MarketSnapshots.
     */
    data: MarketSnapshotCreateManyInput | MarketSnapshotCreateManyInput[]
  }

  /**
   * MarketSnapshot update
   */
  export type MarketSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketSnapshot
     */
    select?: MarketSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketSnapshot
     */
    omit?: MarketSnapshotOmit<ExtArgs> | null
    /**
     * The data needed to update a MarketSnapshot.
     */
    data: XOR<MarketSnapshotUpdateInput, MarketSnapshotUncheckedUpdateInput>
    /**
     * Choose, which MarketSnapshot to update.
     */
    where: MarketSnapshotWhereUniqueInput
  }

  /**
   * MarketSnapshot updateMany
   */
  export type MarketSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MarketSnapshots.
     */
    data: XOR<MarketSnapshotUpdateManyMutationInput, MarketSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which MarketSnapshots to update
     */
    where?: MarketSnapshotWhereInput
    /**
     * Limit how many MarketSnapshots to update.
     */
    limit?: number
  }

  /**
   * MarketSnapshot updateManyAndReturn
   */
  export type MarketSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketSnapshot
     */
    select?: MarketSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MarketSnapshot
     */
    omit?: MarketSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update MarketSnapshots.
     */
    data: XOR<MarketSnapshotUpdateManyMutationInput, MarketSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which MarketSnapshots to update
     */
    where?: MarketSnapshotWhereInput
    /**
     * Limit how many MarketSnapshots to update.
     */
    limit?: number
  }

  /**
   * MarketSnapshot upsert
   */
  export type MarketSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketSnapshot
     */
    select?: MarketSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketSnapshot
     */
    omit?: MarketSnapshotOmit<ExtArgs> | null
    /**
     * The filter to search for the MarketSnapshot to update in case it exists.
     */
    where: MarketSnapshotWhereUniqueInput
    /**
     * In case the MarketSnapshot found by the `where` argument doesn't exist, create a new MarketSnapshot with this data.
     */
    create: XOR<MarketSnapshotCreateInput, MarketSnapshotUncheckedCreateInput>
    /**
     * In case the MarketSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MarketSnapshotUpdateInput, MarketSnapshotUncheckedUpdateInput>
  }

  /**
   * MarketSnapshot delete
   */
  export type MarketSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketSnapshot
     */
    select?: MarketSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketSnapshot
     */
    omit?: MarketSnapshotOmit<ExtArgs> | null
    /**
     * Filter which MarketSnapshot to delete.
     */
    where: MarketSnapshotWhereUniqueInput
  }

  /**
   * MarketSnapshot deleteMany
   */
  export type MarketSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MarketSnapshots to delete
     */
    where?: MarketSnapshotWhereInput
    /**
     * Limit how many MarketSnapshots to delete.
     */
    limit?: number
  }

  /**
   * MarketSnapshot without action
   */
  export type MarketSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MarketSnapshot
     */
    select?: MarketSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MarketSnapshot
     */
    omit?: MarketSnapshotOmit<ExtArgs> | null
  }


  /**
   * Model MacroSnapshot
   */

  export type AggregateMacroSnapshot = {
    _count: MacroSnapshotCountAggregateOutputType | null
    _avg: MacroSnapshotAvgAggregateOutputType | null
    _sum: MacroSnapshotSumAggregateOutputType | null
    _min: MacroSnapshotMinAggregateOutputType | null
    _max: MacroSnapshotMaxAggregateOutputType | null
  }

  export type MacroSnapshotAvgAggregateOutputType = {
    id: number | null
  }

  export type MacroSnapshotSumAggregateOutputType = {
    id: number | null
  }

  export type MacroSnapshotMinAggregateOutputType = {
    id: number | null
    createdAt: string | null
    payloadJson: string | null
  }

  export type MacroSnapshotMaxAggregateOutputType = {
    id: number | null
    createdAt: string | null
    payloadJson: string | null
  }

  export type MacroSnapshotCountAggregateOutputType = {
    id: number
    createdAt: number
    payloadJson: number
    _all: number
  }


  export type MacroSnapshotAvgAggregateInputType = {
    id?: true
  }

  export type MacroSnapshotSumAggregateInputType = {
    id?: true
  }

  export type MacroSnapshotMinAggregateInputType = {
    id?: true
    createdAt?: true
    payloadJson?: true
  }

  export type MacroSnapshotMaxAggregateInputType = {
    id?: true
    createdAt?: true
    payloadJson?: true
  }

  export type MacroSnapshotCountAggregateInputType = {
    id?: true
    createdAt?: true
    payloadJson?: true
    _all?: true
  }

  export type MacroSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MacroSnapshot to aggregate.
     */
    where?: MacroSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MacroSnapshots to fetch.
     */
    orderBy?: MacroSnapshotOrderByWithRelationInput | MacroSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MacroSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MacroSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MacroSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MacroSnapshots
    **/
    _count?: true | MacroSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MacroSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MacroSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MacroSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MacroSnapshotMaxAggregateInputType
  }

  export type GetMacroSnapshotAggregateType<T extends MacroSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateMacroSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMacroSnapshot[P]>
      : GetScalarType<T[P], AggregateMacroSnapshot[P]>
  }




  export type MacroSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MacroSnapshotWhereInput
    orderBy?: MacroSnapshotOrderByWithAggregationInput | MacroSnapshotOrderByWithAggregationInput[]
    by: MacroSnapshotScalarFieldEnum[] | MacroSnapshotScalarFieldEnum
    having?: MacroSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MacroSnapshotCountAggregateInputType | true
    _avg?: MacroSnapshotAvgAggregateInputType
    _sum?: MacroSnapshotSumAggregateInputType
    _min?: MacroSnapshotMinAggregateInputType
    _max?: MacroSnapshotMaxAggregateInputType
  }

  export type MacroSnapshotGroupByOutputType = {
    id: number
    createdAt: string
    payloadJson: string
    _count: MacroSnapshotCountAggregateOutputType | null
    _avg: MacroSnapshotAvgAggregateOutputType | null
    _sum: MacroSnapshotSumAggregateOutputType | null
    _min: MacroSnapshotMinAggregateOutputType | null
    _max: MacroSnapshotMaxAggregateOutputType | null
  }

  type GetMacroSnapshotGroupByPayload<T extends MacroSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MacroSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MacroSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MacroSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], MacroSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type MacroSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    payloadJson?: boolean
  }, ExtArgs["result"]["macroSnapshot"]>

  export type MacroSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    payloadJson?: boolean
  }, ExtArgs["result"]["macroSnapshot"]>

  export type MacroSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    payloadJson?: boolean
  }, ExtArgs["result"]["macroSnapshot"]>

  export type MacroSnapshotSelectScalar = {
    id?: boolean
    createdAt?: boolean
    payloadJson?: boolean
  }

  export type MacroSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "payloadJson", ExtArgs["result"]["macroSnapshot"]>

  export type $MacroSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MacroSnapshot"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: string
      payloadJson: string
    }, ExtArgs["result"]["macroSnapshot"]>
    composites: {}
  }

  type MacroSnapshotGetPayload<S extends boolean | null | undefined | MacroSnapshotDefaultArgs> = $Result.GetResult<Prisma.$MacroSnapshotPayload, S>

  type MacroSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MacroSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MacroSnapshotCountAggregateInputType | true
    }

  export interface MacroSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MacroSnapshot'], meta: { name: 'MacroSnapshot' } }
    /**
     * Find zero or one MacroSnapshot that matches the filter.
     * @param {MacroSnapshotFindUniqueArgs} args - Arguments to find a MacroSnapshot
     * @example
     * // Get one MacroSnapshot
     * const macroSnapshot = await prisma.macroSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MacroSnapshotFindUniqueArgs>(args: SelectSubset<T, MacroSnapshotFindUniqueArgs<ExtArgs>>): Prisma__MacroSnapshotClient<$Result.GetResult<Prisma.$MacroSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MacroSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MacroSnapshotFindUniqueOrThrowArgs} args - Arguments to find a MacroSnapshot
     * @example
     * // Get one MacroSnapshot
     * const macroSnapshot = await prisma.macroSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MacroSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, MacroSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MacroSnapshotClient<$Result.GetResult<Prisma.$MacroSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MacroSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MacroSnapshotFindFirstArgs} args - Arguments to find a MacroSnapshot
     * @example
     * // Get one MacroSnapshot
     * const macroSnapshot = await prisma.macroSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MacroSnapshotFindFirstArgs>(args?: SelectSubset<T, MacroSnapshotFindFirstArgs<ExtArgs>>): Prisma__MacroSnapshotClient<$Result.GetResult<Prisma.$MacroSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MacroSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MacroSnapshotFindFirstOrThrowArgs} args - Arguments to find a MacroSnapshot
     * @example
     * // Get one MacroSnapshot
     * const macroSnapshot = await prisma.macroSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MacroSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, MacroSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__MacroSnapshotClient<$Result.GetResult<Prisma.$MacroSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MacroSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MacroSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MacroSnapshots
     * const macroSnapshots = await prisma.macroSnapshot.findMany()
     * 
     * // Get first 10 MacroSnapshots
     * const macroSnapshots = await prisma.macroSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const macroSnapshotWithIdOnly = await prisma.macroSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MacroSnapshotFindManyArgs>(args?: SelectSubset<T, MacroSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MacroSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MacroSnapshot.
     * @param {MacroSnapshotCreateArgs} args - Arguments to create a MacroSnapshot.
     * @example
     * // Create one MacroSnapshot
     * const MacroSnapshot = await prisma.macroSnapshot.create({
     *   data: {
     *     // ... data to create a MacroSnapshot
     *   }
     * })
     * 
     */
    create<T extends MacroSnapshotCreateArgs>(args: SelectSubset<T, MacroSnapshotCreateArgs<ExtArgs>>): Prisma__MacroSnapshotClient<$Result.GetResult<Prisma.$MacroSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MacroSnapshots.
     * @param {MacroSnapshotCreateManyArgs} args - Arguments to create many MacroSnapshots.
     * @example
     * // Create many MacroSnapshots
     * const macroSnapshot = await prisma.macroSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MacroSnapshotCreateManyArgs>(args?: SelectSubset<T, MacroSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MacroSnapshots and returns the data saved in the database.
     * @param {MacroSnapshotCreateManyAndReturnArgs} args - Arguments to create many MacroSnapshots.
     * @example
     * // Create many MacroSnapshots
     * const macroSnapshot = await prisma.macroSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MacroSnapshots and only return the `id`
     * const macroSnapshotWithIdOnly = await prisma.macroSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MacroSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, MacroSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MacroSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MacroSnapshot.
     * @param {MacroSnapshotDeleteArgs} args - Arguments to delete one MacroSnapshot.
     * @example
     * // Delete one MacroSnapshot
     * const MacroSnapshot = await prisma.macroSnapshot.delete({
     *   where: {
     *     // ... filter to delete one MacroSnapshot
     *   }
     * })
     * 
     */
    delete<T extends MacroSnapshotDeleteArgs>(args: SelectSubset<T, MacroSnapshotDeleteArgs<ExtArgs>>): Prisma__MacroSnapshotClient<$Result.GetResult<Prisma.$MacroSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MacroSnapshot.
     * @param {MacroSnapshotUpdateArgs} args - Arguments to update one MacroSnapshot.
     * @example
     * // Update one MacroSnapshot
     * const macroSnapshot = await prisma.macroSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MacroSnapshotUpdateArgs>(args: SelectSubset<T, MacroSnapshotUpdateArgs<ExtArgs>>): Prisma__MacroSnapshotClient<$Result.GetResult<Prisma.$MacroSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MacroSnapshots.
     * @param {MacroSnapshotDeleteManyArgs} args - Arguments to filter MacroSnapshots to delete.
     * @example
     * // Delete a few MacroSnapshots
     * const { count } = await prisma.macroSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MacroSnapshotDeleteManyArgs>(args?: SelectSubset<T, MacroSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MacroSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MacroSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MacroSnapshots
     * const macroSnapshot = await prisma.macroSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MacroSnapshotUpdateManyArgs>(args: SelectSubset<T, MacroSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MacroSnapshots and returns the data updated in the database.
     * @param {MacroSnapshotUpdateManyAndReturnArgs} args - Arguments to update many MacroSnapshots.
     * @example
     * // Update many MacroSnapshots
     * const macroSnapshot = await prisma.macroSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MacroSnapshots and only return the `id`
     * const macroSnapshotWithIdOnly = await prisma.macroSnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MacroSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, MacroSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MacroSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MacroSnapshot.
     * @param {MacroSnapshotUpsertArgs} args - Arguments to update or create a MacroSnapshot.
     * @example
     * // Update or create a MacroSnapshot
     * const macroSnapshot = await prisma.macroSnapshot.upsert({
     *   create: {
     *     // ... data to create a MacroSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MacroSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends MacroSnapshotUpsertArgs>(args: SelectSubset<T, MacroSnapshotUpsertArgs<ExtArgs>>): Prisma__MacroSnapshotClient<$Result.GetResult<Prisma.$MacroSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MacroSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MacroSnapshotCountArgs} args - Arguments to filter MacroSnapshots to count.
     * @example
     * // Count the number of MacroSnapshots
     * const count = await prisma.macroSnapshot.count({
     *   where: {
     *     // ... the filter for the MacroSnapshots we want to count
     *   }
     * })
    **/
    count<T extends MacroSnapshotCountArgs>(
      args?: Subset<T, MacroSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MacroSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MacroSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MacroSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MacroSnapshotAggregateArgs>(args: Subset<T, MacroSnapshotAggregateArgs>): Prisma.PrismaPromise<GetMacroSnapshotAggregateType<T>>

    /**
     * Group by MacroSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MacroSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MacroSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MacroSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: MacroSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MacroSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMacroSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MacroSnapshot model
   */
  readonly fields: MacroSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MacroSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MacroSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MacroSnapshot model
   */
  interface MacroSnapshotFieldRefs {
    readonly id: FieldRef<"MacroSnapshot", 'Int'>
    readonly createdAt: FieldRef<"MacroSnapshot", 'String'>
    readonly payloadJson: FieldRef<"MacroSnapshot", 'String'>
  }
    

  // Custom InputTypes
  /**
   * MacroSnapshot findUnique
   */
  export type MacroSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MacroSnapshot
     */
    select?: MacroSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MacroSnapshot
     */
    omit?: MacroSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which MacroSnapshot to fetch.
     */
    where: MacroSnapshotWhereUniqueInput
  }

  /**
   * MacroSnapshot findUniqueOrThrow
   */
  export type MacroSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MacroSnapshot
     */
    select?: MacroSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MacroSnapshot
     */
    omit?: MacroSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which MacroSnapshot to fetch.
     */
    where: MacroSnapshotWhereUniqueInput
  }

  /**
   * MacroSnapshot findFirst
   */
  export type MacroSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MacroSnapshot
     */
    select?: MacroSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MacroSnapshot
     */
    omit?: MacroSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which MacroSnapshot to fetch.
     */
    where?: MacroSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MacroSnapshots to fetch.
     */
    orderBy?: MacroSnapshotOrderByWithRelationInput | MacroSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MacroSnapshots.
     */
    cursor?: MacroSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MacroSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MacroSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MacroSnapshots.
     */
    distinct?: MacroSnapshotScalarFieldEnum | MacroSnapshotScalarFieldEnum[]
  }

  /**
   * MacroSnapshot findFirstOrThrow
   */
  export type MacroSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MacroSnapshot
     */
    select?: MacroSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MacroSnapshot
     */
    omit?: MacroSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which MacroSnapshot to fetch.
     */
    where?: MacroSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MacroSnapshots to fetch.
     */
    orderBy?: MacroSnapshotOrderByWithRelationInput | MacroSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MacroSnapshots.
     */
    cursor?: MacroSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MacroSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MacroSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MacroSnapshots.
     */
    distinct?: MacroSnapshotScalarFieldEnum | MacroSnapshotScalarFieldEnum[]
  }

  /**
   * MacroSnapshot findMany
   */
  export type MacroSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MacroSnapshot
     */
    select?: MacroSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MacroSnapshot
     */
    omit?: MacroSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which MacroSnapshots to fetch.
     */
    where?: MacroSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MacroSnapshots to fetch.
     */
    orderBy?: MacroSnapshotOrderByWithRelationInput | MacroSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MacroSnapshots.
     */
    cursor?: MacroSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MacroSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MacroSnapshots.
     */
    skip?: number
    distinct?: MacroSnapshotScalarFieldEnum | MacroSnapshotScalarFieldEnum[]
  }

  /**
   * MacroSnapshot create
   */
  export type MacroSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MacroSnapshot
     */
    select?: MacroSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MacroSnapshot
     */
    omit?: MacroSnapshotOmit<ExtArgs> | null
    /**
     * The data needed to create a MacroSnapshot.
     */
    data: XOR<MacroSnapshotCreateInput, MacroSnapshotUncheckedCreateInput>
  }

  /**
   * MacroSnapshot createMany
   */
  export type MacroSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MacroSnapshots.
     */
    data: MacroSnapshotCreateManyInput | MacroSnapshotCreateManyInput[]
  }

  /**
   * MacroSnapshot createManyAndReturn
   */
  export type MacroSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MacroSnapshot
     */
    select?: MacroSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MacroSnapshot
     */
    omit?: MacroSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many MacroSnapshots.
     */
    data: MacroSnapshotCreateManyInput | MacroSnapshotCreateManyInput[]
  }

  /**
   * MacroSnapshot update
   */
  export type MacroSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MacroSnapshot
     */
    select?: MacroSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MacroSnapshot
     */
    omit?: MacroSnapshotOmit<ExtArgs> | null
    /**
     * The data needed to update a MacroSnapshot.
     */
    data: XOR<MacroSnapshotUpdateInput, MacroSnapshotUncheckedUpdateInput>
    /**
     * Choose, which MacroSnapshot to update.
     */
    where: MacroSnapshotWhereUniqueInput
  }

  /**
   * MacroSnapshot updateMany
   */
  export type MacroSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MacroSnapshots.
     */
    data: XOR<MacroSnapshotUpdateManyMutationInput, MacroSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which MacroSnapshots to update
     */
    where?: MacroSnapshotWhereInput
    /**
     * Limit how many MacroSnapshots to update.
     */
    limit?: number
  }

  /**
   * MacroSnapshot updateManyAndReturn
   */
  export type MacroSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MacroSnapshot
     */
    select?: MacroSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MacroSnapshot
     */
    omit?: MacroSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update MacroSnapshots.
     */
    data: XOR<MacroSnapshotUpdateManyMutationInput, MacroSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which MacroSnapshots to update
     */
    where?: MacroSnapshotWhereInput
    /**
     * Limit how many MacroSnapshots to update.
     */
    limit?: number
  }

  /**
   * MacroSnapshot upsert
   */
  export type MacroSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MacroSnapshot
     */
    select?: MacroSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MacroSnapshot
     */
    omit?: MacroSnapshotOmit<ExtArgs> | null
    /**
     * The filter to search for the MacroSnapshot to update in case it exists.
     */
    where: MacroSnapshotWhereUniqueInput
    /**
     * In case the MacroSnapshot found by the `where` argument doesn't exist, create a new MacroSnapshot with this data.
     */
    create: XOR<MacroSnapshotCreateInput, MacroSnapshotUncheckedCreateInput>
    /**
     * In case the MacroSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MacroSnapshotUpdateInput, MacroSnapshotUncheckedUpdateInput>
  }

  /**
   * MacroSnapshot delete
   */
  export type MacroSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MacroSnapshot
     */
    select?: MacroSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MacroSnapshot
     */
    omit?: MacroSnapshotOmit<ExtArgs> | null
    /**
     * Filter which MacroSnapshot to delete.
     */
    where: MacroSnapshotWhereUniqueInput
  }

  /**
   * MacroSnapshot deleteMany
   */
  export type MacroSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MacroSnapshots to delete
     */
    where?: MacroSnapshotWhereInput
    /**
     * Limit how many MacroSnapshots to delete.
     */
    limit?: number
  }

  /**
   * MacroSnapshot without action
   */
  export type MacroSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MacroSnapshot
     */
    select?: MacroSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MacroSnapshot
     */
    omit?: MacroSnapshotOmit<ExtArgs> | null
  }


  /**
   * Model SnbSnapshot
   */

  export type AggregateSnbSnapshot = {
    _count: SnbSnapshotCountAggregateOutputType | null
    _avg: SnbSnapshotAvgAggregateOutputType | null
    _sum: SnbSnapshotSumAggregateOutputType | null
    _min: SnbSnapshotMinAggregateOutputType | null
    _max: SnbSnapshotMaxAggregateOutputType | null
  }

  export type SnbSnapshotAvgAggregateOutputType = {
    id: number | null
  }

  export type SnbSnapshotSumAggregateOutputType = {
    id: number | null
  }

  export type SnbSnapshotMinAggregateOutputType = {
    id: number | null
    createdAt: string | null
    payloadJson: string | null
  }

  export type SnbSnapshotMaxAggregateOutputType = {
    id: number | null
    createdAt: string | null
    payloadJson: string | null
  }

  export type SnbSnapshotCountAggregateOutputType = {
    id: number
    createdAt: number
    payloadJson: number
    _all: number
  }


  export type SnbSnapshotAvgAggregateInputType = {
    id?: true
  }

  export type SnbSnapshotSumAggregateInputType = {
    id?: true
  }

  export type SnbSnapshotMinAggregateInputType = {
    id?: true
    createdAt?: true
    payloadJson?: true
  }

  export type SnbSnapshotMaxAggregateInputType = {
    id?: true
    createdAt?: true
    payloadJson?: true
  }

  export type SnbSnapshotCountAggregateInputType = {
    id?: true
    createdAt?: true
    payloadJson?: true
    _all?: true
  }

  export type SnbSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SnbSnapshot to aggregate.
     */
    where?: SnbSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SnbSnapshots to fetch.
     */
    orderBy?: SnbSnapshotOrderByWithRelationInput | SnbSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SnbSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SnbSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SnbSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SnbSnapshots
    **/
    _count?: true | SnbSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SnbSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SnbSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SnbSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SnbSnapshotMaxAggregateInputType
  }

  export type GetSnbSnapshotAggregateType<T extends SnbSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateSnbSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSnbSnapshot[P]>
      : GetScalarType<T[P], AggregateSnbSnapshot[P]>
  }




  export type SnbSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SnbSnapshotWhereInput
    orderBy?: SnbSnapshotOrderByWithAggregationInput | SnbSnapshotOrderByWithAggregationInput[]
    by: SnbSnapshotScalarFieldEnum[] | SnbSnapshotScalarFieldEnum
    having?: SnbSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SnbSnapshotCountAggregateInputType | true
    _avg?: SnbSnapshotAvgAggregateInputType
    _sum?: SnbSnapshotSumAggregateInputType
    _min?: SnbSnapshotMinAggregateInputType
    _max?: SnbSnapshotMaxAggregateInputType
  }

  export type SnbSnapshotGroupByOutputType = {
    id: number
    createdAt: string
    payloadJson: string
    _count: SnbSnapshotCountAggregateOutputType | null
    _avg: SnbSnapshotAvgAggregateOutputType | null
    _sum: SnbSnapshotSumAggregateOutputType | null
    _min: SnbSnapshotMinAggregateOutputType | null
    _max: SnbSnapshotMaxAggregateOutputType | null
  }

  type GetSnbSnapshotGroupByPayload<T extends SnbSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SnbSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SnbSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SnbSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], SnbSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type SnbSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    payloadJson?: boolean
  }, ExtArgs["result"]["snbSnapshot"]>

  export type SnbSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    payloadJson?: boolean
  }, ExtArgs["result"]["snbSnapshot"]>

  export type SnbSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    payloadJson?: boolean
  }, ExtArgs["result"]["snbSnapshot"]>

  export type SnbSnapshotSelectScalar = {
    id?: boolean
    createdAt?: boolean
    payloadJson?: boolean
  }

  export type SnbSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "payloadJson", ExtArgs["result"]["snbSnapshot"]>

  export type $SnbSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SnbSnapshot"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: string
      payloadJson: string
    }, ExtArgs["result"]["snbSnapshot"]>
    composites: {}
  }

  type SnbSnapshotGetPayload<S extends boolean | null | undefined | SnbSnapshotDefaultArgs> = $Result.GetResult<Prisma.$SnbSnapshotPayload, S>

  type SnbSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SnbSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SnbSnapshotCountAggregateInputType | true
    }

  export interface SnbSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SnbSnapshot'], meta: { name: 'SnbSnapshot' } }
    /**
     * Find zero or one SnbSnapshot that matches the filter.
     * @param {SnbSnapshotFindUniqueArgs} args - Arguments to find a SnbSnapshot
     * @example
     * // Get one SnbSnapshot
     * const snbSnapshot = await prisma.snbSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SnbSnapshotFindUniqueArgs>(args: SelectSubset<T, SnbSnapshotFindUniqueArgs<ExtArgs>>): Prisma__SnbSnapshotClient<$Result.GetResult<Prisma.$SnbSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SnbSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SnbSnapshotFindUniqueOrThrowArgs} args - Arguments to find a SnbSnapshot
     * @example
     * // Get one SnbSnapshot
     * const snbSnapshot = await prisma.snbSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SnbSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, SnbSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SnbSnapshotClient<$Result.GetResult<Prisma.$SnbSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SnbSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SnbSnapshotFindFirstArgs} args - Arguments to find a SnbSnapshot
     * @example
     * // Get one SnbSnapshot
     * const snbSnapshot = await prisma.snbSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SnbSnapshotFindFirstArgs>(args?: SelectSubset<T, SnbSnapshotFindFirstArgs<ExtArgs>>): Prisma__SnbSnapshotClient<$Result.GetResult<Prisma.$SnbSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SnbSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SnbSnapshotFindFirstOrThrowArgs} args - Arguments to find a SnbSnapshot
     * @example
     * // Get one SnbSnapshot
     * const snbSnapshot = await prisma.snbSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SnbSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, SnbSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__SnbSnapshotClient<$Result.GetResult<Prisma.$SnbSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SnbSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SnbSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SnbSnapshots
     * const snbSnapshots = await prisma.snbSnapshot.findMany()
     * 
     * // Get first 10 SnbSnapshots
     * const snbSnapshots = await prisma.snbSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const snbSnapshotWithIdOnly = await prisma.snbSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SnbSnapshotFindManyArgs>(args?: SelectSubset<T, SnbSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SnbSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SnbSnapshot.
     * @param {SnbSnapshotCreateArgs} args - Arguments to create a SnbSnapshot.
     * @example
     * // Create one SnbSnapshot
     * const SnbSnapshot = await prisma.snbSnapshot.create({
     *   data: {
     *     // ... data to create a SnbSnapshot
     *   }
     * })
     * 
     */
    create<T extends SnbSnapshotCreateArgs>(args: SelectSubset<T, SnbSnapshotCreateArgs<ExtArgs>>): Prisma__SnbSnapshotClient<$Result.GetResult<Prisma.$SnbSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SnbSnapshots.
     * @param {SnbSnapshotCreateManyArgs} args - Arguments to create many SnbSnapshots.
     * @example
     * // Create many SnbSnapshots
     * const snbSnapshot = await prisma.snbSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SnbSnapshotCreateManyArgs>(args?: SelectSubset<T, SnbSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SnbSnapshots and returns the data saved in the database.
     * @param {SnbSnapshotCreateManyAndReturnArgs} args - Arguments to create many SnbSnapshots.
     * @example
     * // Create many SnbSnapshots
     * const snbSnapshot = await prisma.snbSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SnbSnapshots and only return the `id`
     * const snbSnapshotWithIdOnly = await prisma.snbSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SnbSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, SnbSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SnbSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SnbSnapshot.
     * @param {SnbSnapshotDeleteArgs} args - Arguments to delete one SnbSnapshot.
     * @example
     * // Delete one SnbSnapshot
     * const SnbSnapshot = await prisma.snbSnapshot.delete({
     *   where: {
     *     // ... filter to delete one SnbSnapshot
     *   }
     * })
     * 
     */
    delete<T extends SnbSnapshotDeleteArgs>(args: SelectSubset<T, SnbSnapshotDeleteArgs<ExtArgs>>): Prisma__SnbSnapshotClient<$Result.GetResult<Prisma.$SnbSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SnbSnapshot.
     * @param {SnbSnapshotUpdateArgs} args - Arguments to update one SnbSnapshot.
     * @example
     * // Update one SnbSnapshot
     * const snbSnapshot = await prisma.snbSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SnbSnapshotUpdateArgs>(args: SelectSubset<T, SnbSnapshotUpdateArgs<ExtArgs>>): Prisma__SnbSnapshotClient<$Result.GetResult<Prisma.$SnbSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SnbSnapshots.
     * @param {SnbSnapshotDeleteManyArgs} args - Arguments to filter SnbSnapshots to delete.
     * @example
     * // Delete a few SnbSnapshots
     * const { count } = await prisma.snbSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SnbSnapshotDeleteManyArgs>(args?: SelectSubset<T, SnbSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SnbSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SnbSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SnbSnapshots
     * const snbSnapshot = await prisma.snbSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SnbSnapshotUpdateManyArgs>(args: SelectSubset<T, SnbSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SnbSnapshots and returns the data updated in the database.
     * @param {SnbSnapshotUpdateManyAndReturnArgs} args - Arguments to update many SnbSnapshots.
     * @example
     * // Update many SnbSnapshots
     * const snbSnapshot = await prisma.snbSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SnbSnapshots and only return the `id`
     * const snbSnapshotWithIdOnly = await prisma.snbSnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SnbSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, SnbSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SnbSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SnbSnapshot.
     * @param {SnbSnapshotUpsertArgs} args - Arguments to update or create a SnbSnapshot.
     * @example
     * // Update or create a SnbSnapshot
     * const snbSnapshot = await prisma.snbSnapshot.upsert({
     *   create: {
     *     // ... data to create a SnbSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SnbSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends SnbSnapshotUpsertArgs>(args: SelectSubset<T, SnbSnapshotUpsertArgs<ExtArgs>>): Prisma__SnbSnapshotClient<$Result.GetResult<Prisma.$SnbSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SnbSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SnbSnapshotCountArgs} args - Arguments to filter SnbSnapshots to count.
     * @example
     * // Count the number of SnbSnapshots
     * const count = await prisma.snbSnapshot.count({
     *   where: {
     *     // ... the filter for the SnbSnapshots we want to count
     *   }
     * })
    **/
    count<T extends SnbSnapshotCountArgs>(
      args?: Subset<T, SnbSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SnbSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SnbSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SnbSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SnbSnapshotAggregateArgs>(args: Subset<T, SnbSnapshotAggregateArgs>): Prisma.PrismaPromise<GetSnbSnapshotAggregateType<T>>

    /**
     * Group by SnbSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SnbSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SnbSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SnbSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: SnbSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SnbSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSnbSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SnbSnapshot model
   */
  readonly fields: SnbSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SnbSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SnbSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SnbSnapshot model
   */
  interface SnbSnapshotFieldRefs {
    readonly id: FieldRef<"SnbSnapshot", 'Int'>
    readonly createdAt: FieldRef<"SnbSnapshot", 'String'>
    readonly payloadJson: FieldRef<"SnbSnapshot", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SnbSnapshot findUnique
   */
  export type SnbSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SnbSnapshot
     */
    select?: SnbSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SnbSnapshot
     */
    omit?: SnbSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which SnbSnapshot to fetch.
     */
    where: SnbSnapshotWhereUniqueInput
  }

  /**
   * SnbSnapshot findUniqueOrThrow
   */
  export type SnbSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SnbSnapshot
     */
    select?: SnbSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SnbSnapshot
     */
    omit?: SnbSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which SnbSnapshot to fetch.
     */
    where: SnbSnapshotWhereUniqueInput
  }

  /**
   * SnbSnapshot findFirst
   */
  export type SnbSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SnbSnapshot
     */
    select?: SnbSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SnbSnapshot
     */
    omit?: SnbSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which SnbSnapshot to fetch.
     */
    where?: SnbSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SnbSnapshots to fetch.
     */
    orderBy?: SnbSnapshotOrderByWithRelationInput | SnbSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SnbSnapshots.
     */
    cursor?: SnbSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SnbSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SnbSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SnbSnapshots.
     */
    distinct?: SnbSnapshotScalarFieldEnum | SnbSnapshotScalarFieldEnum[]
  }

  /**
   * SnbSnapshot findFirstOrThrow
   */
  export type SnbSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SnbSnapshot
     */
    select?: SnbSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SnbSnapshot
     */
    omit?: SnbSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which SnbSnapshot to fetch.
     */
    where?: SnbSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SnbSnapshots to fetch.
     */
    orderBy?: SnbSnapshotOrderByWithRelationInput | SnbSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SnbSnapshots.
     */
    cursor?: SnbSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SnbSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SnbSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SnbSnapshots.
     */
    distinct?: SnbSnapshotScalarFieldEnum | SnbSnapshotScalarFieldEnum[]
  }

  /**
   * SnbSnapshot findMany
   */
  export type SnbSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SnbSnapshot
     */
    select?: SnbSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SnbSnapshot
     */
    omit?: SnbSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which SnbSnapshots to fetch.
     */
    where?: SnbSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SnbSnapshots to fetch.
     */
    orderBy?: SnbSnapshotOrderByWithRelationInput | SnbSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SnbSnapshots.
     */
    cursor?: SnbSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SnbSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SnbSnapshots.
     */
    skip?: number
    distinct?: SnbSnapshotScalarFieldEnum | SnbSnapshotScalarFieldEnum[]
  }

  /**
   * SnbSnapshot create
   */
  export type SnbSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SnbSnapshot
     */
    select?: SnbSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SnbSnapshot
     */
    omit?: SnbSnapshotOmit<ExtArgs> | null
    /**
     * The data needed to create a SnbSnapshot.
     */
    data: XOR<SnbSnapshotCreateInput, SnbSnapshotUncheckedCreateInput>
  }

  /**
   * SnbSnapshot createMany
   */
  export type SnbSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SnbSnapshots.
     */
    data: SnbSnapshotCreateManyInput | SnbSnapshotCreateManyInput[]
  }

  /**
   * SnbSnapshot createManyAndReturn
   */
  export type SnbSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SnbSnapshot
     */
    select?: SnbSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SnbSnapshot
     */
    omit?: SnbSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many SnbSnapshots.
     */
    data: SnbSnapshotCreateManyInput | SnbSnapshotCreateManyInput[]
  }

  /**
   * SnbSnapshot update
   */
  export type SnbSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SnbSnapshot
     */
    select?: SnbSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SnbSnapshot
     */
    omit?: SnbSnapshotOmit<ExtArgs> | null
    /**
     * The data needed to update a SnbSnapshot.
     */
    data: XOR<SnbSnapshotUpdateInput, SnbSnapshotUncheckedUpdateInput>
    /**
     * Choose, which SnbSnapshot to update.
     */
    where: SnbSnapshotWhereUniqueInput
  }

  /**
   * SnbSnapshot updateMany
   */
  export type SnbSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SnbSnapshots.
     */
    data: XOR<SnbSnapshotUpdateManyMutationInput, SnbSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which SnbSnapshots to update
     */
    where?: SnbSnapshotWhereInput
    /**
     * Limit how many SnbSnapshots to update.
     */
    limit?: number
  }

  /**
   * SnbSnapshot updateManyAndReturn
   */
  export type SnbSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SnbSnapshot
     */
    select?: SnbSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SnbSnapshot
     */
    omit?: SnbSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update SnbSnapshots.
     */
    data: XOR<SnbSnapshotUpdateManyMutationInput, SnbSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which SnbSnapshots to update
     */
    where?: SnbSnapshotWhereInput
    /**
     * Limit how many SnbSnapshots to update.
     */
    limit?: number
  }

  /**
   * SnbSnapshot upsert
   */
  export type SnbSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SnbSnapshot
     */
    select?: SnbSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SnbSnapshot
     */
    omit?: SnbSnapshotOmit<ExtArgs> | null
    /**
     * The filter to search for the SnbSnapshot to update in case it exists.
     */
    where: SnbSnapshotWhereUniqueInput
    /**
     * In case the SnbSnapshot found by the `where` argument doesn't exist, create a new SnbSnapshot with this data.
     */
    create: XOR<SnbSnapshotCreateInput, SnbSnapshotUncheckedCreateInput>
    /**
     * In case the SnbSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SnbSnapshotUpdateInput, SnbSnapshotUncheckedUpdateInput>
  }

  /**
   * SnbSnapshot delete
   */
  export type SnbSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SnbSnapshot
     */
    select?: SnbSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SnbSnapshot
     */
    omit?: SnbSnapshotOmit<ExtArgs> | null
    /**
     * Filter which SnbSnapshot to delete.
     */
    where: SnbSnapshotWhereUniqueInput
  }

  /**
   * SnbSnapshot deleteMany
   */
  export type SnbSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SnbSnapshots to delete
     */
    where?: SnbSnapshotWhereInput
    /**
     * Limit how many SnbSnapshots to delete.
     */
    limit?: number
  }

  /**
   * SnbSnapshot without action
   */
  export type SnbSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SnbSnapshot
     */
    select?: SnbSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SnbSnapshot
     */
    omit?: SnbSnapshotOmit<ExtArgs> | null
  }


  /**
   * Model SwissOpenDataSnapshot
   */

  export type AggregateSwissOpenDataSnapshot = {
    _count: SwissOpenDataSnapshotCountAggregateOutputType | null
    _avg: SwissOpenDataSnapshotAvgAggregateOutputType | null
    _sum: SwissOpenDataSnapshotSumAggregateOutputType | null
    _min: SwissOpenDataSnapshotMinAggregateOutputType | null
    _max: SwissOpenDataSnapshotMaxAggregateOutputType | null
  }

  export type SwissOpenDataSnapshotAvgAggregateOutputType = {
    id: number | null
  }

  export type SwissOpenDataSnapshotSumAggregateOutputType = {
    id: number | null
  }

  export type SwissOpenDataSnapshotMinAggregateOutputType = {
    id: number | null
    createdAt: string | null
    payloadJson: string | null
  }

  export type SwissOpenDataSnapshotMaxAggregateOutputType = {
    id: number | null
    createdAt: string | null
    payloadJson: string | null
  }

  export type SwissOpenDataSnapshotCountAggregateOutputType = {
    id: number
    createdAt: number
    payloadJson: number
    _all: number
  }


  export type SwissOpenDataSnapshotAvgAggregateInputType = {
    id?: true
  }

  export type SwissOpenDataSnapshotSumAggregateInputType = {
    id?: true
  }

  export type SwissOpenDataSnapshotMinAggregateInputType = {
    id?: true
    createdAt?: true
    payloadJson?: true
  }

  export type SwissOpenDataSnapshotMaxAggregateInputType = {
    id?: true
    createdAt?: true
    payloadJson?: true
  }

  export type SwissOpenDataSnapshotCountAggregateInputType = {
    id?: true
    createdAt?: true
    payloadJson?: true
    _all?: true
  }

  export type SwissOpenDataSnapshotAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SwissOpenDataSnapshot to aggregate.
     */
    where?: SwissOpenDataSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SwissOpenDataSnapshots to fetch.
     */
    orderBy?: SwissOpenDataSnapshotOrderByWithRelationInput | SwissOpenDataSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SwissOpenDataSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SwissOpenDataSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SwissOpenDataSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SwissOpenDataSnapshots
    **/
    _count?: true | SwissOpenDataSnapshotCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SwissOpenDataSnapshotAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SwissOpenDataSnapshotSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SwissOpenDataSnapshotMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SwissOpenDataSnapshotMaxAggregateInputType
  }

  export type GetSwissOpenDataSnapshotAggregateType<T extends SwissOpenDataSnapshotAggregateArgs> = {
        [P in keyof T & keyof AggregateSwissOpenDataSnapshot]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSwissOpenDataSnapshot[P]>
      : GetScalarType<T[P], AggregateSwissOpenDataSnapshot[P]>
  }




  export type SwissOpenDataSnapshotGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SwissOpenDataSnapshotWhereInput
    orderBy?: SwissOpenDataSnapshotOrderByWithAggregationInput | SwissOpenDataSnapshotOrderByWithAggregationInput[]
    by: SwissOpenDataSnapshotScalarFieldEnum[] | SwissOpenDataSnapshotScalarFieldEnum
    having?: SwissOpenDataSnapshotScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SwissOpenDataSnapshotCountAggregateInputType | true
    _avg?: SwissOpenDataSnapshotAvgAggregateInputType
    _sum?: SwissOpenDataSnapshotSumAggregateInputType
    _min?: SwissOpenDataSnapshotMinAggregateInputType
    _max?: SwissOpenDataSnapshotMaxAggregateInputType
  }

  export type SwissOpenDataSnapshotGroupByOutputType = {
    id: number
    createdAt: string
    payloadJson: string
    _count: SwissOpenDataSnapshotCountAggregateOutputType | null
    _avg: SwissOpenDataSnapshotAvgAggregateOutputType | null
    _sum: SwissOpenDataSnapshotSumAggregateOutputType | null
    _min: SwissOpenDataSnapshotMinAggregateOutputType | null
    _max: SwissOpenDataSnapshotMaxAggregateOutputType | null
  }

  type GetSwissOpenDataSnapshotGroupByPayload<T extends SwissOpenDataSnapshotGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SwissOpenDataSnapshotGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SwissOpenDataSnapshotGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SwissOpenDataSnapshotGroupByOutputType[P]>
            : GetScalarType<T[P], SwissOpenDataSnapshotGroupByOutputType[P]>
        }
      >
    >


  export type SwissOpenDataSnapshotSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    payloadJson?: boolean
  }, ExtArgs["result"]["swissOpenDataSnapshot"]>

  export type SwissOpenDataSnapshotSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    payloadJson?: boolean
  }, ExtArgs["result"]["swissOpenDataSnapshot"]>

  export type SwissOpenDataSnapshotSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    createdAt?: boolean
    payloadJson?: boolean
  }, ExtArgs["result"]["swissOpenDataSnapshot"]>

  export type SwissOpenDataSnapshotSelectScalar = {
    id?: boolean
    createdAt?: boolean
    payloadJson?: boolean
  }

  export type SwissOpenDataSnapshotOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "createdAt" | "payloadJson", ExtArgs["result"]["swissOpenDataSnapshot"]>

  export type $SwissOpenDataSnapshotPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SwissOpenDataSnapshot"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      createdAt: string
      payloadJson: string
    }, ExtArgs["result"]["swissOpenDataSnapshot"]>
    composites: {}
  }

  type SwissOpenDataSnapshotGetPayload<S extends boolean | null | undefined | SwissOpenDataSnapshotDefaultArgs> = $Result.GetResult<Prisma.$SwissOpenDataSnapshotPayload, S>

  type SwissOpenDataSnapshotCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SwissOpenDataSnapshotFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SwissOpenDataSnapshotCountAggregateInputType | true
    }

  export interface SwissOpenDataSnapshotDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SwissOpenDataSnapshot'], meta: { name: 'SwissOpenDataSnapshot' } }
    /**
     * Find zero or one SwissOpenDataSnapshot that matches the filter.
     * @param {SwissOpenDataSnapshotFindUniqueArgs} args - Arguments to find a SwissOpenDataSnapshot
     * @example
     * // Get one SwissOpenDataSnapshot
     * const swissOpenDataSnapshot = await prisma.swissOpenDataSnapshot.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SwissOpenDataSnapshotFindUniqueArgs>(args: SelectSubset<T, SwissOpenDataSnapshotFindUniqueArgs<ExtArgs>>): Prisma__SwissOpenDataSnapshotClient<$Result.GetResult<Prisma.$SwissOpenDataSnapshotPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SwissOpenDataSnapshot that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SwissOpenDataSnapshotFindUniqueOrThrowArgs} args - Arguments to find a SwissOpenDataSnapshot
     * @example
     * // Get one SwissOpenDataSnapshot
     * const swissOpenDataSnapshot = await prisma.swissOpenDataSnapshot.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SwissOpenDataSnapshotFindUniqueOrThrowArgs>(args: SelectSubset<T, SwissOpenDataSnapshotFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SwissOpenDataSnapshotClient<$Result.GetResult<Prisma.$SwissOpenDataSnapshotPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SwissOpenDataSnapshot that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SwissOpenDataSnapshotFindFirstArgs} args - Arguments to find a SwissOpenDataSnapshot
     * @example
     * // Get one SwissOpenDataSnapshot
     * const swissOpenDataSnapshot = await prisma.swissOpenDataSnapshot.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SwissOpenDataSnapshotFindFirstArgs>(args?: SelectSubset<T, SwissOpenDataSnapshotFindFirstArgs<ExtArgs>>): Prisma__SwissOpenDataSnapshotClient<$Result.GetResult<Prisma.$SwissOpenDataSnapshotPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SwissOpenDataSnapshot that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SwissOpenDataSnapshotFindFirstOrThrowArgs} args - Arguments to find a SwissOpenDataSnapshot
     * @example
     * // Get one SwissOpenDataSnapshot
     * const swissOpenDataSnapshot = await prisma.swissOpenDataSnapshot.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SwissOpenDataSnapshotFindFirstOrThrowArgs>(args?: SelectSubset<T, SwissOpenDataSnapshotFindFirstOrThrowArgs<ExtArgs>>): Prisma__SwissOpenDataSnapshotClient<$Result.GetResult<Prisma.$SwissOpenDataSnapshotPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SwissOpenDataSnapshots that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SwissOpenDataSnapshotFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SwissOpenDataSnapshots
     * const swissOpenDataSnapshots = await prisma.swissOpenDataSnapshot.findMany()
     * 
     * // Get first 10 SwissOpenDataSnapshots
     * const swissOpenDataSnapshots = await prisma.swissOpenDataSnapshot.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const swissOpenDataSnapshotWithIdOnly = await prisma.swissOpenDataSnapshot.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SwissOpenDataSnapshotFindManyArgs>(args?: SelectSubset<T, SwissOpenDataSnapshotFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SwissOpenDataSnapshotPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SwissOpenDataSnapshot.
     * @param {SwissOpenDataSnapshotCreateArgs} args - Arguments to create a SwissOpenDataSnapshot.
     * @example
     * // Create one SwissOpenDataSnapshot
     * const SwissOpenDataSnapshot = await prisma.swissOpenDataSnapshot.create({
     *   data: {
     *     // ... data to create a SwissOpenDataSnapshot
     *   }
     * })
     * 
     */
    create<T extends SwissOpenDataSnapshotCreateArgs>(args: SelectSubset<T, SwissOpenDataSnapshotCreateArgs<ExtArgs>>): Prisma__SwissOpenDataSnapshotClient<$Result.GetResult<Prisma.$SwissOpenDataSnapshotPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SwissOpenDataSnapshots.
     * @param {SwissOpenDataSnapshotCreateManyArgs} args - Arguments to create many SwissOpenDataSnapshots.
     * @example
     * // Create many SwissOpenDataSnapshots
     * const swissOpenDataSnapshot = await prisma.swissOpenDataSnapshot.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SwissOpenDataSnapshotCreateManyArgs>(args?: SelectSubset<T, SwissOpenDataSnapshotCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SwissOpenDataSnapshots and returns the data saved in the database.
     * @param {SwissOpenDataSnapshotCreateManyAndReturnArgs} args - Arguments to create many SwissOpenDataSnapshots.
     * @example
     * // Create many SwissOpenDataSnapshots
     * const swissOpenDataSnapshot = await prisma.swissOpenDataSnapshot.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SwissOpenDataSnapshots and only return the `id`
     * const swissOpenDataSnapshotWithIdOnly = await prisma.swissOpenDataSnapshot.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SwissOpenDataSnapshotCreateManyAndReturnArgs>(args?: SelectSubset<T, SwissOpenDataSnapshotCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SwissOpenDataSnapshotPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SwissOpenDataSnapshot.
     * @param {SwissOpenDataSnapshotDeleteArgs} args - Arguments to delete one SwissOpenDataSnapshot.
     * @example
     * // Delete one SwissOpenDataSnapshot
     * const SwissOpenDataSnapshot = await prisma.swissOpenDataSnapshot.delete({
     *   where: {
     *     // ... filter to delete one SwissOpenDataSnapshot
     *   }
     * })
     * 
     */
    delete<T extends SwissOpenDataSnapshotDeleteArgs>(args: SelectSubset<T, SwissOpenDataSnapshotDeleteArgs<ExtArgs>>): Prisma__SwissOpenDataSnapshotClient<$Result.GetResult<Prisma.$SwissOpenDataSnapshotPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SwissOpenDataSnapshot.
     * @param {SwissOpenDataSnapshotUpdateArgs} args - Arguments to update one SwissOpenDataSnapshot.
     * @example
     * // Update one SwissOpenDataSnapshot
     * const swissOpenDataSnapshot = await prisma.swissOpenDataSnapshot.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SwissOpenDataSnapshotUpdateArgs>(args: SelectSubset<T, SwissOpenDataSnapshotUpdateArgs<ExtArgs>>): Prisma__SwissOpenDataSnapshotClient<$Result.GetResult<Prisma.$SwissOpenDataSnapshotPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SwissOpenDataSnapshots.
     * @param {SwissOpenDataSnapshotDeleteManyArgs} args - Arguments to filter SwissOpenDataSnapshots to delete.
     * @example
     * // Delete a few SwissOpenDataSnapshots
     * const { count } = await prisma.swissOpenDataSnapshot.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SwissOpenDataSnapshotDeleteManyArgs>(args?: SelectSubset<T, SwissOpenDataSnapshotDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SwissOpenDataSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SwissOpenDataSnapshotUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SwissOpenDataSnapshots
     * const swissOpenDataSnapshot = await prisma.swissOpenDataSnapshot.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SwissOpenDataSnapshotUpdateManyArgs>(args: SelectSubset<T, SwissOpenDataSnapshotUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SwissOpenDataSnapshots and returns the data updated in the database.
     * @param {SwissOpenDataSnapshotUpdateManyAndReturnArgs} args - Arguments to update many SwissOpenDataSnapshots.
     * @example
     * // Update many SwissOpenDataSnapshots
     * const swissOpenDataSnapshot = await prisma.swissOpenDataSnapshot.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SwissOpenDataSnapshots and only return the `id`
     * const swissOpenDataSnapshotWithIdOnly = await prisma.swissOpenDataSnapshot.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SwissOpenDataSnapshotUpdateManyAndReturnArgs>(args: SelectSubset<T, SwissOpenDataSnapshotUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SwissOpenDataSnapshotPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SwissOpenDataSnapshot.
     * @param {SwissOpenDataSnapshotUpsertArgs} args - Arguments to update or create a SwissOpenDataSnapshot.
     * @example
     * // Update or create a SwissOpenDataSnapshot
     * const swissOpenDataSnapshot = await prisma.swissOpenDataSnapshot.upsert({
     *   create: {
     *     // ... data to create a SwissOpenDataSnapshot
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SwissOpenDataSnapshot we want to update
     *   }
     * })
     */
    upsert<T extends SwissOpenDataSnapshotUpsertArgs>(args: SelectSubset<T, SwissOpenDataSnapshotUpsertArgs<ExtArgs>>): Prisma__SwissOpenDataSnapshotClient<$Result.GetResult<Prisma.$SwissOpenDataSnapshotPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SwissOpenDataSnapshots.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SwissOpenDataSnapshotCountArgs} args - Arguments to filter SwissOpenDataSnapshots to count.
     * @example
     * // Count the number of SwissOpenDataSnapshots
     * const count = await prisma.swissOpenDataSnapshot.count({
     *   where: {
     *     // ... the filter for the SwissOpenDataSnapshots we want to count
     *   }
     * })
    **/
    count<T extends SwissOpenDataSnapshotCountArgs>(
      args?: Subset<T, SwissOpenDataSnapshotCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SwissOpenDataSnapshotCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SwissOpenDataSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SwissOpenDataSnapshotAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SwissOpenDataSnapshotAggregateArgs>(args: Subset<T, SwissOpenDataSnapshotAggregateArgs>): Prisma.PrismaPromise<GetSwissOpenDataSnapshotAggregateType<T>>

    /**
     * Group by SwissOpenDataSnapshot.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SwissOpenDataSnapshotGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SwissOpenDataSnapshotGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SwissOpenDataSnapshotGroupByArgs['orderBy'] }
        : { orderBy?: SwissOpenDataSnapshotGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SwissOpenDataSnapshotGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSwissOpenDataSnapshotGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SwissOpenDataSnapshot model
   */
  readonly fields: SwissOpenDataSnapshotFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SwissOpenDataSnapshot.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SwissOpenDataSnapshotClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SwissOpenDataSnapshot model
   */
  interface SwissOpenDataSnapshotFieldRefs {
    readonly id: FieldRef<"SwissOpenDataSnapshot", 'Int'>
    readonly createdAt: FieldRef<"SwissOpenDataSnapshot", 'String'>
    readonly payloadJson: FieldRef<"SwissOpenDataSnapshot", 'String'>
  }
    

  // Custom InputTypes
  /**
   * SwissOpenDataSnapshot findUnique
   */
  export type SwissOpenDataSnapshotFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwissOpenDataSnapshot
     */
    select?: SwissOpenDataSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwissOpenDataSnapshot
     */
    omit?: SwissOpenDataSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which SwissOpenDataSnapshot to fetch.
     */
    where: SwissOpenDataSnapshotWhereUniqueInput
  }

  /**
   * SwissOpenDataSnapshot findUniqueOrThrow
   */
  export type SwissOpenDataSnapshotFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwissOpenDataSnapshot
     */
    select?: SwissOpenDataSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwissOpenDataSnapshot
     */
    omit?: SwissOpenDataSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which SwissOpenDataSnapshot to fetch.
     */
    where: SwissOpenDataSnapshotWhereUniqueInput
  }

  /**
   * SwissOpenDataSnapshot findFirst
   */
  export type SwissOpenDataSnapshotFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwissOpenDataSnapshot
     */
    select?: SwissOpenDataSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwissOpenDataSnapshot
     */
    omit?: SwissOpenDataSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which SwissOpenDataSnapshot to fetch.
     */
    where?: SwissOpenDataSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SwissOpenDataSnapshots to fetch.
     */
    orderBy?: SwissOpenDataSnapshotOrderByWithRelationInput | SwissOpenDataSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SwissOpenDataSnapshots.
     */
    cursor?: SwissOpenDataSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SwissOpenDataSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SwissOpenDataSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SwissOpenDataSnapshots.
     */
    distinct?: SwissOpenDataSnapshotScalarFieldEnum | SwissOpenDataSnapshotScalarFieldEnum[]
  }

  /**
   * SwissOpenDataSnapshot findFirstOrThrow
   */
  export type SwissOpenDataSnapshotFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwissOpenDataSnapshot
     */
    select?: SwissOpenDataSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwissOpenDataSnapshot
     */
    omit?: SwissOpenDataSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which SwissOpenDataSnapshot to fetch.
     */
    where?: SwissOpenDataSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SwissOpenDataSnapshots to fetch.
     */
    orderBy?: SwissOpenDataSnapshotOrderByWithRelationInput | SwissOpenDataSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SwissOpenDataSnapshots.
     */
    cursor?: SwissOpenDataSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SwissOpenDataSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SwissOpenDataSnapshots.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SwissOpenDataSnapshots.
     */
    distinct?: SwissOpenDataSnapshotScalarFieldEnum | SwissOpenDataSnapshotScalarFieldEnum[]
  }

  /**
   * SwissOpenDataSnapshot findMany
   */
  export type SwissOpenDataSnapshotFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwissOpenDataSnapshot
     */
    select?: SwissOpenDataSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwissOpenDataSnapshot
     */
    omit?: SwissOpenDataSnapshotOmit<ExtArgs> | null
    /**
     * Filter, which SwissOpenDataSnapshots to fetch.
     */
    where?: SwissOpenDataSnapshotWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SwissOpenDataSnapshots to fetch.
     */
    orderBy?: SwissOpenDataSnapshotOrderByWithRelationInput | SwissOpenDataSnapshotOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SwissOpenDataSnapshots.
     */
    cursor?: SwissOpenDataSnapshotWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SwissOpenDataSnapshots from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SwissOpenDataSnapshots.
     */
    skip?: number
    distinct?: SwissOpenDataSnapshotScalarFieldEnum | SwissOpenDataSnapshotScalarFieldEnum[]
  }

  /**
   * SwissOpenDataSnapshot create
   */
  export type SwissOpenDataSnapshotCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwissOpenDataSnapshot
     */
    select?: SwissOpenDataSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwissOpenDataSnapshot
     */
    omit?: SwissOpenDataSnapshotOmit<ExtArgs> | null
    /**
     * The data needed to create a SwissOpenDataSnapshot.
     */
    data: XOR<SwissOpenDataSnapshotCreateInput, SwissOpenDataSnapshotUncheckedCreateInput>
  }

  /**
   * SwissOpenDataSnapshot createMany
   */
  export type SwissOpenDataSnapshotCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SwissOpenDataSnapshots.
     */
    data: SwissOpenDataSnapshotCreateManyInput | SwissOpenDataSnapshotCreateManyInput[]
  }

  /**
   * SwissOpenDataSnapshot createManyAndReturn
   */
  export type SwissOpenDataSnapshotCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwissOpenDataSnapshot
     */
    select?: SwissOpenDataSnapshotSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SwissOpenDataSnapshot
     */
    omit?: SwissOpenDataSnapshotOmit<ExtArgs> | null
    /**
     * The data used to create many SwissOpenDataSnapshots.
     */
    data: SwissOpenDataSnapshotCreateManyInput | SwissOpenDataSnapshotCreateManyInput[]
  }

  /**
   * SwissOpenDataSnapshot update
   */
  export type SwissOpenDataSnapshotUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwissOpenDataSnapshot
     */
    select?: SwissOpenDataSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwissOpenDataSnapshot
     */
    omit?: SwissOpenDataSnapshotOmit<ExtArgs> | null
    /**
     * The data needed to update a SwissOpenDataSnapshot.
     */
    data: XOR<SwissOpenDataSnapshotUpdateInput, SwissOpenDataSnapshotUncheckedUpdateInput>
    /**
     * Choose, which SwissOpenDataSnapshot to update.
     */
    where: SwissOpenDataSnapshotWhereUniqueInput
  }

  /**
   * SwissOpenDataSnapshot updateMany
   */
  export type SwissOpenDataSnapshotUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SwissOpenDataSnapshots.
     */
    data: XOR<SwissOpenDataSnapshotUpdateManyMutationInput, SwissOpenDataSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which SwissOpenDataSnapshots to update
     */
    where?: SwissOpenDataSnapshotWhereInput
    /**
     * Limit how many SwissOpenDataSnapshots to update.
     */
    limit?: number
  }

  /**
   * SwissOpenDataSnapshot updateManyAndReturn
   */
  export type SwissOpenDataSnapshotUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwissOpenDataSnapshot
     */
    select?: SwissOpenDataSnapshotSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SwissOpenDataSnapshot
     */
    omit?: SwissOpenDataSnapshotOmit<ExtArgs> | null
    /**
     * The data used to update SwissOpenDataSnapshots.
     */
    data: XOR<SwissOpenDataSnapshotUpdateManyMutationInput, SwissOpenDataSnapshotUncheckedUpdateManyInput>
    /**
     * Filter which SwissOpenDataSnapshots to update
     */
    where?: SwissOpenDataSnapshotWhereInput
    /**
     * Limit how many SwissOpenDataSnapshots to update.
     */
    limit?: number
  }

  /**
   * SwissOpenDataSnapshot upsert
   */
  export type SwissOpenDataSnapshotUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwissOpenDataSnapshot
     */
    select?: SwissOpenDataSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwissOpenDataSnapshot
     */
    omit?: SwissOpenDataSnapshotOmit<ExtArgs> | null
    /**
     * The filter to search for the SwissOpenDataSnapshot to update in case it exists.
     */
    where: SwissOpenDataSnapshotWhereUniqueInput
    /**
     * In case the SwissOpenDataSnapshot found by the `where` argument doesn't exist, create a new SwissOpenDataSnapshot with this data.
     */
    create: XOR<SwissOpenDataSnapshotCreateInput, SwissOpenDataSnapshotUncheckedCreateInput>
    /**
     * In case the SwissOpenDataSnapshot was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SwissOpenDataSnapshotUpdateInput, SwissOpenDataSnapshotUncheckedUpdateInput>
  }

  /**
   * SwissOpenDataSnapshot delete
   */
  export type SwissOpenDataSnapshotDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwissOpenDataSnapshot
     */
    select?: SwissOpenDataSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwissOpenDataSnapshot
     */
    omit?: SwissOpenDataSnapshotOmit<ExtArgs> | null
    /**
     * Filter which SwissOpenDataSnapshot to delete.
     */
    where: SwissOpenDataSnapshotWhereUniqueInput
  }

  /**
   * SwissOpenDataSnapshot deleteMany
   */
  export type SwissOpenDataSnapshotDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SwissOpenDataSnapshots to delete
     */
    where?: SwissOpenDataSnapshotWhereInput
    /**
     * Limit how many SwissOpenDataSnapshots to delete.
     */
    limit?: number
  }

  /**
   * SwissOpenDataSnapshot without action
   */
  export type SwissOpenDataSnapshotDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SwissOpenDataSnapshot
     */
    select?: SwissOpenDataSnapshotSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SwissOpenDataSnapshot
     */
    omit?: SwissOpenDataSnapshotOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ArticleScalarFieldEnum: {
    id: 'id',
    slug: 'slug',
    category: 'category',
    date: 'date',
    authorName: 'authorName',
    authorRole: 'authorRole',
    sourcesJson: 'sourcesJson',
    imageUrl: 'imageUrl',
    expertQuote: 'expertQuote',
    keyFactsJson: 'keyFactsJson',
    isVerified: 'isVerified',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    videoUrl: 'videoUrl'
  };

  export type ArticleScalarFieldEnum = (typeof ArticleScalarFieldEnum)[keyof typeof ArticleScalarFieldEnum]


  export const ArticleTranslationScalarFieldEnum: {
    id: 'id',
    articleId: 'articleId',
    locale: 'locale',
    title: 'title',
    excerpt: 'excerpt',
    contentHtml: 'contentHtml',
    metaTitle: 'metaTitle',
    metaDescription: 'metaDescription',
    updatedAt: 'updatedAt',
    expertQuote: 'expertQuote',
    keyFactsJson: 'keyFactsJson'
  };

  export type ArticleTranslationScalarFieldEnum = (typeof ArticleTranslationScalarFieldEnum)[keyof typeof ArticleTranslationScalarFieldEnum]


  export const NewsletterSubscriptionScalarFieldEnum: {
    id: 'id',
    email: 'email',
    source: 'source',
    leadMagnet: 'leadMagnet',
    createdAt: 'createdAt'
  };

  export type NewsletterSubscriptionScalarFieldEnum = (typeof NewsletterSubscriptionScalarFieldEnum)[keyof typeof NewsletterSubscriptionScalarFieldEnum]


  export const MarketSnapshotScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    payloadJson: 'payloadJson'
  };

  export type MarketSnapshotScalarFieldEnum = (typeof MarketSnapshotScalarFieldEnum)[keyof typeof MarketSnapshotScalarFieldEnum]


  export const MacroSnapshotScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    payloadJson: 'payloadJson'
  };

  export type MacroSnapshotScalarFieldEnum = (typeof MacroSnapshotScalarFieldEnum)[keyof typeof MacroSnapshotScalarFieldEnum]


  export const SnbSnapshotScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    payloadJson: 'payloadJson'
  };

  export type SnbSnapshotScalarFieldEnum = (typeof SnbSnapshotScalarFieldEnum)[keyof typeof SnbSnapshotScalarFieldEnum]


  export const SwissOpenDataSnapshotScalarFieldEnum: {
    id: 'id',
    createdAt: 'createdAt',
    payloadJson: 'payloadJson'
  };

  export type SwissOpenDataSnapshotScalarFieldEnum = (typeof SwissOpenDataSnapshotScalarFieldEnum)[keyof typeof SwissOpenDataSnapshotScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type ArticleWhereInput = {
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    id?: StringFilter<"Article"> | string
    slug?: StringFilter<"Article"> | string
    category?: StringFilter<"Article"> | string
    date?: DateTimeFilter<"Article"> | Date | string
    authorName?: StringFilter<"Article"> | string
    authorRole?: StringNullableFilter<"Article"> | string | null
    sourcesJson?: StringFilter<"Article"> | string
    imageUrl?: StringNullableFilter<"Article"> | string | null
    expertQuote?: StringNullableFilter<"Article"> | string | null
    keyFactsJson?: StringNullableFilter<"Article"> | string | null
    isVerified?: BoolFilter<"Article"> | boolean
    createdAt?: DateTimeFilter<"Article"> | Date | string
    updatedAt?: DateTimeFilter<"Article"> | Date | string
    videoUrl?: StringNullableFilter<"Article"> | string | null
    translations?: ArticleTranslationListRelationFilter
  }

  export type ArticleOrderByWithRelationInput = {
    id?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    date?: SortOrder
    authorName?: SortOrder
    authorRole?: SortOrderInput | SortOrder
    sourcesJson?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    expertQuote?: SortOrderInput | SortOrder
    keyFactsJson?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    videoUrl?: SortOrderInput | SortOrder
    translations?: ArticleTranslationOrderByRelationAggregateInput
  }

  export type ArticleWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ArticleWhereInput | ArticleWhereInput[]
    OR?: ArticleWhereInput[]
    NOT?: ArticleWhereInput | ArticleWhereInput[]
    category?: StringFilter<"Article"> | string
    date?: DateTimeFilter<"Article"> | Date | string
    authorName?: StringFilter<"Article"> | string
    authorRole?: StringNullableFilter<"Article"> | string | null
    sourcesJson?: StringFilter<"Article"> | string
    imageUrl?: StringNullableFilter<"Article"> | string | null
    expertQuote?: StringNullableFilter<"Article"> | string | null
    keyFactsJson?: StringNullableFilter<"Article"> | string | null
    isVerified?: BoolFilter<"Article"> | boolean
    createdAt?: DateTimeFilter<"Article"> | Date | string
    updatedAt?: DateTimeFilter<"Article"> | Date | string
    videoUrl?: StringNullableFilter<"Article"> | string | null
    translations?: ArticleTranslationListRelationFilter
  }, "id" | "slug">

  export type ArticleOrderByWithAggregationInput = {
    id?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    date?: SortOrder
    authorName?: SortOrder
    authorRole?: SortOrderInput | SortOrder
    sourcesJson?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    expertQuote?: SortOrderInput | SortOrder
    keyFactsJson?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    videoUrl?: SortOrderInput | SortOrder
    _count?: ArticleCountOrderByAggregateInput
    _max?: ArticleMaxOrderByAggregateInput
    _min?: ArticleMinOrderByAggregateInput
  }

  export type ArticleScalarWhereWithAggregatesInput = {
    AND?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    OR?: ArticleScalarWhereWithAggregatesInput[]
    NOT?: ArticleScalarWhereWithAggregatesInput | ArticleScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Article"> | string
    slug?: StringWithAggregatesFilter<"Article"> | string
    category?: StringWithAggregatesFilter<"Article"> | string
    date?: DateTimeWithAggregatesFilter<"Article"> | Date | string
    authorName?: StringWithAggregatesFilter<"Article"> | string
    authorRole?: StringNullableWithAggregatesFilter<"Article"> | string | null
    sourcesJson?: StringWithAggregatesFilter<"Article"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"Article"> | string | null
    expertQuote?: StringNullableWithAggregatesFilter<"Article"> | string | null
    keyFactsJson?: StringNullableWithAggregatesFilter<"Article"> | string | null
    isVerified?: BoolWithAggregatesFilter<"Article"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Article"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Article"> | Date | string
    videoUrl?: StringNullableWithAggregatesFilter<"Article"> | string | null
  }

  export type ArticleTranslationWhereInput = {
    AND?: ArticleTranslationWhereInput | ArticleTranslationWhereInput[]
    OR?: ArticleTranslationWhereInput[]
    NOT?: ArticleTranslationWhereInput | ArticleTranslationWhereInput[]
    id?: StringFilter<"ArticleTranslation"> | string
    articleId?: StringFilter<"ArticleTranslation"> | string
    locale?: StringFilter<"ArticleTranslation"> | string
    title?: StringFilter<"ArticleTranslation"> | string
    excerpt?: StringFilter<"ArticleTranslation"> | string
    contentHtml?: StringFilter<"ArticleTranslation"> | string
    metaTitle?: StringNullableFilter<"ArticleTranslation"> | string | null
    metaDescription?: StringNullableFilter<"ArticleTranslation"> | string | null
    updatedAt?: DateTimeFilter<"ArticleTranslation"> | Date | string
    expertQuote?: StringNullableFilter<"ArticleTranslation"> | string | null
    keyFactsJson?: StringNullableFilter<"ArticleTranslation"> | string | null
    article?: XOR<ArticleScalarRelationFilter, ArticleWhereInput>
  }

  export type ArticleTranslationOrderByWithRelationInput = {
    id?: SortOrder
    articleId?: SortOrder
    locale?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    contentHtml?: SortOrder
    metaTitle?: SortOrderInput | SortOrder
    metaDescription?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    expertQuote?: SortOrderInput | SortOrder
    keyFactsJson?: SortOrderInput | SortOrder
    article?: ArticleOrderByWithRelationInput
  }

  export type ArticleTranslationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    articleId_locale?: ArticleTranslationArticleIdLocaleCompoundUniqueInput
    AND?: ArticleTranslationWhereInput | ArticleTranslationWhereInput[]
    OR?: ArticleTranslationWhereInput[]
    NOT?: ArticleTranslationWhereInput | ArticleTranslationWhereInput[]
    articleId?: StringFilter<"ArticleTranslation"> | string
    locale?: StringFilter<"ArticleTranslation"> | string
    title?: StringFilter<"ArticleTranslation"> | string
    excerpt?: StringFilter<"ArticleTranslation"> | string
    contentHtml?: StringFilter<"ArticleTranslation"> | string
    metaTitle?: StringNullableFilter<"ArticleTranslation"> | string | null
    metaDescription?: StringNullableFilter<"ArticleTranslation"> | string | null
    updatedAt?: DateTimeFilter<"ArticleTranslation"> | Date | string
    expertQuote?: StringNullableFilter<"ArticleTranslation"> | string | null
    keyFactsJson?: StringNullableFilter<"ArticleTranslation"> | string | null
    article?: XOR<ArticleScalarRelationFilter, ArticleWhereInput>
  }, "id" | "articleId_locale">

  export type ArticleTranslationOrderByWithAggregationInput = {
    id?: SortOrder
    articleId?: SortOrder
    locale?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    contentHtml?: SortOrder
    metaTitle?: SortOrderInput | SortOrder
    metaDescription?: SortOrderInput | SortOrder
    updatedAt?: SortOrder
    expertQuote?: SortOrderInput | SortOrder
    keyFactsJson?: SortOrderInput | SortOrder
    _count?: ArticleTranslationCountOrderByAggregateInput
    _max?: ArticleTranslationMaxOrderByAggregateInput
    _min?: ArticleTranslationMinOrderByAggregateInput
  }

  export type ArticleTranslationScalarWhereWithAggregatesInput = {
    AND?: ArticleTranslationScalarWhereWithAggregatesInput | ArticleTranslationScalarWhereWithAggregatesInput[]
    OR?: ArticleTranslationScalarWhereWithAggregatesInput[]
    NOT?: ArticleTranslationScalarWhereWithAggregatesInput | ArticleTranslationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ArticleTranslation"> | string
    articleId?: StringWithAggregatesFilter<"ArticleTranslation"> | string
    locale?: StringWithAggregatesFilter<"ArticleTranslation"> | string
    title?: StringWithAggregatesFilter<"ArticleTranslation"> | string
    excerpt?: StringWithAggregatesFilter<"ArticleTranslation"> | string
    contentHtml?: StringWithAggregatesFilter<"ArticleTranslation"> | string
    metaTitle?: StringNullableWithAggregatesFilter<"ArticleTranslation"> | string | null
    metaDescription?: StringNullableWithAggregatesFilter<"ArticleTranslation"> | string | null
    updatedAt?: DateTimeWithAggregatesFilter<"ArticleTranslation"> | Date | string
    expertQuote?: StringNullableWithAggregatesFilter<"ArticleTranslation"> | string | null
    keyFactsJson?: StringNullableWithAggregatesFilter<"ArticleTranslation"> | string | null
  }

  export type NewsletterSubscriptionWhereInput = {
    AND?: NewsletterSubscriptionWhereInput | NewsletterSubscriptionWhereInput[]
    OR?: NewsletterSubscriptionWhereInput[]
    NOT?: NewsletterSubscriptionWhereInput | NewsletterSubscriptionWhereInput[]
    id?: StringFilter<"NewsletterSubscription"> | string
    email?: StringFilter<"NewsletterSubscription"> | string
    source?: StringFilter<"NewsletterSubscription"> | string
    leadMagnet?: StringNullableFilter<"NewsletterSubscription"> | string | null
    createdAt?: DateTimeFilter<"NewsletterSubscription"> | Date | string
  }

  export type NewsletterSubscriptionOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    source?: SortOrder
    leadMagnet?: SortOrderInput | SortOrder
    createdAt?: SortOrder
  }

  export type NewsletterSubscriptionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NewsletterSubscriptionWhereInput | NewsletterSubscriptionWhereInput[]
    OR?: NewsletterSubscriptionWhereInput[]
    NOT?: NewsletterSubscriptionWhereInput | NewsletterSubscriptionWhereInput[]
    email?: StringFilter<"NewsletterSubscription"> | string
    source?: StringFilter<"NewsletterSubscription"> | string
    leadMagnet?: StringNullableFilter<"NewsletterSubscription"> | string | null
    createdAt?: DateTimeFilter<"NewsletterSubscription"> | Date | string
  }, "id">

  export type NewsletterSubscriptionOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    source?: SortOrder
    leadMagnet?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: NewsletterSubscriptionCountOrderByAggregateInput
    _max?: NewsletterSubscriptionMaxOrderByAggregateInput
    _min?: NewsletterSubscriptionMinOrderByAggregateInput
  }

  export type NewsletterSubscriptionScalarWhereWithAggregatesInput = {
    AND?: NewsletterSubscriptionScalarWhereWithAggregatesInput | NewsletterSubscriptionScalarWhereWithAggregatesInput[]
    OR?: NewsletterSubscriptionScalarWhereWithAggregatesInput[]
    NOT?: NewsletterSubscriptionScalarWhereWithAggregatesInput | NewsletterSubscriptionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NewsletterSubscription"> | string
    email?: StringWithAggregatesFilter<"NewsletterSubscription"> | string
    source?: StringWithAggregatesFilter<"NewsletterSubscription"> | string
    leadMagnet?: StringNullableWithAggregatesFilter<"NewsletterSubscription"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"NewsletterSubscription"> | Date | string
  }

  export type MarketSnapshotWhereInput = {
    AND?: MarketSnapshotWhereInput | MarketSnapshotWhereInput[]
    OR?: MarketSnapshotWhereInput[]
    NOT?: MarketSnapshotWhereInput | MarketSnapshotWhereInput[]
    id?: IntFilter<"MarketSnapshot"> | number
    createdAt?: StringFilter<"MarketSnapshot"> | string
    payloadJson?: StringFilter<"MarketSnapshot"> | string
  }

  export type MarketSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    payloadJson?: SortOrder
  }

  export type MarketSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MarketSnapshotWhereInput | MarketSnapshotWhereInput[]
    OR?: MarketSnapshotWhereInput[]
    NOT?: MarketSnapshotWhereInput | MarketSnapshotWhereInput[]
    createdAt?: StringFilter<"MarketSnapshot"> | string
    payloadJson?: StringFilter<"MarketSnapshot"> | string
  }, "id">

  export type MarketSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    payloadJson?: SortOrder
    _count?: MarketSnapshotCountOrderByAggregateInput
    _avg?: MarketSnapshotAvgOrderByAggregateInput
    _max?: MarketSnapshotMaxOrderByAggregateInput
    _min?: MarketSnapshotMinOrderByAggregateInput
    _sum?: MarketSnapshotSumOrderByAggregateInput
  }

  export type MarketSnapshotScalarWhereWithAggregatesInput = {
    AND?: MarketSnapshotScalarWhereWithAggregatesInput | MarketSnapshotScalarWhereWithAggregatesInput[]
    OR?: MarketSnapshotScalarWhereWithAggregatesInput[]
    NOT?: MarketSnapshotScalarWhereWithAggregatesInput | MarketSnapshotScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MarketSnapshot"> | number
    createdAt?: StringWithAggregatesFilter<"MarketSnapshot"> | string
    payloadJson?: StringWithAggregatesFilter<"MarketSnapshot"> | string
  }

  export type MacroSnapshotWhereInput = {
    AND?: MacroSnapshotWhereInput | MacroSnapshotWhereInput[]
    OR?: MacroSnapshotWhereInput[]
    NOT?: MacroSnapshotWhereInput | MacroSnapshotWhereInput[]
    id?: IntFilter<"MacroSnapshot"> | number
    createdAt?: StringFilter<"MacroSnapshot"> | string
    payloadJson?: StringFilter<"MacroSnapshot"> | string
  }

  export type MacroSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    payloadJson?: SortOrder
  }

  export type MacroSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MacroSnapshotWhereInput | MacroSnapshotWhereInput[]
    OR?: MacroSnapshotWhereInput[]
    NOT?: MacroSnapshotWhereInput | MacroSnapshotWhereInput[]
    createdAt?: StringFilter<"MacroSnapshot"> | string
    payloadJson?: StringFilter<"MacroSnapshot"> | string
  }, "id">

  export type MacroSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    payloadJson?: SortOrder
    _count?: MacroSnapshotCountOrderByAggregateInput
    _avg?: MacroSnapshotAvgOrderByAggregateInput
    _max?: MacroSnapshotMaxOrderByAggregateInput
    _min?: MacroSnapshotMinOrderByAggregateInput
    _sum?: MacroSnapshotSumOrderByAggregateInput
  }

  export type MacroSnapshotScalarWhereWithAggregatesInput = {
    AND?: MacroSnapshotScalarWhereWithAggregatesInput | MacroSnapshotScalarWhereWithAggregatesInput[]
    OR?: MacroSnapshotScalarWhereWithAggregatesInput[]
    NOT?: MacroSnapshotScalarWhereWithAggregatesInput | MacroSnapshotScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MacroSnapshot"> | number
    createdAt?: StringWithAggregatesFilter<"MacroSnapshot"> | string
    payloadJson?: StringWithAggregatesFilter<"MacroSnapshot"> | string
  }

  export type SnbSnapshotWhereInput = {
    AND?: SnbSnapshotWhereInput | SnbSnapshotWhereInput[]
    OR?: SnbSnapshotWhereInput[]
    NOT?: SnbSnapshotWhereInput | SnbSnapshotWhereInput[]
    id?: IntFilter<"SnbSnapshot"> | number
    createdAt?: StringFilter<"SnbSnapshot"> | string
    payloadJson?: StringFilter<"SnbSnapshot"> | string
  }

  export type SnbSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    payloadJson?: SortOrder
  }

  export type SnbSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SnbSnapshotWhereInput | SnbSnapshotWhereInput[]
    OR?: SnbSnapshotWhereInput[]
    NOT?: SnbSnapshotWhereInput | SnbSnapshotWhereInput[]
    createdAt?: StringFilter<"SnbSnapshot"> | string
    payloadJson?: StringFilter<"SnbSnapshot"> | string
  }, "id">

  export type SnbSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    payloadJson?: SortOrder
    _count?: SnbSnapshotCountOrderByAggregateInput
    _avg?: SnbSnapshotAvgOrderByAggregateInput
    _max?: SnbSnapshotMaxOrderByAggregateInput
    _min?: SnbSnapshotMinOrderByAggregateInput
    _sum?: SnbSnapshotSumOrderByAggregateInput
  }

  export type SnbSnapshotScalarWhereWithAggregatesInput = {
    AND?: SnbSnapshotScalarWhereWithAggregatesInput | SnbSnapshotScalarWhereWithAggregatesInput[]
    OR?: SnbSnapshotScalarWhereWithAggregatesInput[]
    NOT?: SnbSnapshotScalarWhereWithAggregatesInput | SnbSnapshotScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SnbSnapshot"> | number
    createdAt?: StringWithAggregatesFilter<"SnbSnapshot"> | string
    payloadJson?: StringWithAggregatesFilter<"SnbSnapshot"> | string
  }

  export type SwissOpenDataSnapshotWhereInput = {
    AND?: SwissOpenDataSnapshotWhereInput | SwissOpenDataSnapshotWhereInput[]
    OR?: SwissOpenDataSnapshotWhereInput[]
    NOT?: SwissOpenDataSnapshotWhereInput | SwissOpenDataSnapshotWhereInput[]
    id?: IntFilter<"SwissOpenDataSnapshot"> | number
    createdAt?: StringFilter<"SwissOpenDataSnapshot"> | string
    payloadJson?: StringFilter<"SwissOpenDataSnapshot"> | string
  }

  export type SwissOpenDataSnapshotOrderByWithRelationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    payloadJson?: SortOrder
  }

  export type SwissOpenDataSnapshotWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SwissOpenDataSnapshotWhereInput | SwissOpenDataSnapshotWhereInput[]
    OR?: SwissOpenDataSnapshotWhereInput[]
    NOT?: SwissOpenDataSnapshotWhereInput | SwissOpenDataSnapshotWhereInput[]
    createdAt?: StringFilter<"SwissOpenDataSnapshot"> | string
    payloadJson?: StringFilter<"SwissOpenDataSnapshot"> | string
  }, "id">

  export type SwissOpenDataSnapshotOrderByWithAggregationInput = {
    id?: SortOrder
    createdAt?: SortOrder
    payloadJson?: SortOrder
    _count?: SwissOpenDataSnapshotCountOrderByAggregateInput
    _avg?: SwissOpenDataSnapshotAvgOrderByAggregateInput
    _max?: SwissOpenDataSnapshotMaxOrderByAggregateInput
    _min?: SwissOpenDataSnapshotMinOrderByAggregateInput
    _sum?: SwissOpenDataSnapshotSumOrderByAggregateInput
  }

  export type SwissOpenDataSnapshotScalarWhereWithAggregatesInput = {
    AND?: SwissOpenDataSnapshotScalarWhereWithAggregatesInput | SwissOpenDataSnapshotScalarWhereWithAggregatesInput[]
    OR?: SwissOpenDataSnapshotScalarWhereWithAggregatesInput[]
    NOT?: SwissOpenDataSnapshotScalarWhereWithAggregatesInput | SwissOpenDataSnapshotScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SwissOpenDataSnapshot"> | number
    createdAt?: StringWithAggregatesFilter<"SwissOpenDataSnapshot"> | string
    payloadJson?: StringWithAggregatesFilter<"SwissOpenDataSnapshot"> | string
  }

  export type ArticleCreateInput = {
    id?: string
    slug: string
    category: string
    date: Date | string
    authorName: string
    authorRole?: string | null
    sourcesJson: string
    imageUrl?: string | null
    expertQuote?: string | null
    keyFactsJson?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    videoUrl?: string | null
    translations?: ArticleTranslationCreateNestedManyWithoutArticleInput
  }

  export type ArticleUncheckedCreateInput = {
    id?: string
    slug: string
    category: string
    date: Date | string
    authorName: string
    authorRole?: string | null
    sourcesJson: string
    imageUrl?: string | null
    expertQuote?: string | null
    keyFactsJson?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    videoUrl?: string | null
    translations?: ArticleTranslationUncheckedCreateNestedManyWithoutArticleInput
  }

  export type ArticleUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorRole?: NullableStringFieldUpdateOperationsInput | string | null
    sourcesJson?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    expertQuote?: NullableStringFieldUpdateOperationsInput | string | null
    keyFactsJson?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    translations?: ArticleTranslationUpdateManyWithoutArticleNestedInput
  }

  export type ArticleUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorRole?: NullableStringFieldUpdateOperationsInput | string | null
    sourcesJson?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    expertQuote?: NullableStringFieldUpdateOperationsInput | string | null
    keyFactsJson?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
    translations?: ArticleTranslationUncheckedUpdateManyWithoutArticleNestedInput
  }

  export type ArticleCreateManyInput = {
    id?: string
    slug: string
    category: string
    date: Date | string
    authorName: string
    authorRole?: string | null
    sourcesJson: string
    imageUrl?: string | null
    expertQuote?: string | null
    keyFactsJson?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    videoUrl?: string | null
  }

  export type ArticleUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorRole?: NullableStringFieldUpdateOperationsInput | string | null
    sourcesJson?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    expertQuote?: NullableStringFieldUpdateOperationsInput | string | null
    keyFactsJson?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArticleUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorRole?: NullableStringFieldUpdateOperationsInput | string | null
    sourcesJson?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    expertQuote?: NullableStringFieldUpdateOperationsInput | string | null
    keyFactsJson?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArticleTranslationCreateInput = {
    id?: string
    locale: string
    title: string
    excerpt: string
    contentHtml: string
    metaTitle?: string | null
    metaDescription?: string | null
    updatedAt?: Date | string
    expertQuote?: string | null
    keyFactsJson?: string | null
    article: ArticleCreateNestedOneWithoutTranslationsInput
  }

  export type ArticleTranslationUncheckedCreateInput = {
    id?: string
    articleId: string
    locale: string
    title: string
    excerpt: string
    contentHtml: string
    metaTitle?: string | null
    metaDescription?: string | null
    updatedAt?: Date | string
    expertQuote?: string | null
    keyFactsJson?: string | null
  }

  export type ArticleTranslationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    contentHtml?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expertQuote?: NullableStringFieldUpdateOperationsInput | string | null
    keyFactsJson?: NullableStringFieldUpdateOperationsInput | string | null
    article?: ArticleUpdateOneRequiredWithoutTranslationsNestedInput
  }

  export type ArticleTranslationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    articleId?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    contentHtml?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expertQuote?: NullableStringFieldUpdateOperationsInput | string | null
    keyFactsJson?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArticleTranslationCreateManyInput = {
    id?: string
    articleId: string
    locale: string
    title: string
    excerpt: string
    contentHtml: string
    metaTitle?: string | null
    metaDescription?: string | null
    updatedAt?: Date | string
    expertQuote?: string | null
    keyFactsJson?: string | null
  }

  export type ArticleTranslationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    contentHtml?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expertQuote?: NullableStringFieldUpdateOperationsInput | string | null
    keyFactsJson?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArticleTranslationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    articleId?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    contentHtml?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expertQuote?: NullableStringFieldUpdateOperationsInput | string | null
    keyFactsJson?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type NewsletterSubscriptionCreateInput = {
    id?: string
    email: string
    source: string
    leadMagnet?: string | null
    createdAt?: Date | string
  }

  export type NewsletterSubscriptionUncheckedCreateInput = {
    id?: string
    email: string
    source: string
    leadMagnet?: string | null
    createdAt?: Date | string
  }

  export type NewsletterSubscriptionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    leadMagnet?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriptionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    leadMagnet?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriptionCreateManyInput = {
    id?: string
    email: string
    source: string
    leadMagnet?: string | null
    createdAt?: Date | string
  }

  export type NewsletterSubscriptionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    leadMagnet?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsletterSubscriptionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    source?: StringFieldUpdateOperationsInput | string
    leadMagnet?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MarketSnapshotCreateInput = {
    createdAt: string
    payloadJson: string
  }

  export type MarketSnapshotUncheckedCreateInput = {
    id?: number
    createdAt: string
    payloadJson: string
  }

  export type MarketSnapshotUpdateInput = {
    createdAt?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
  }

  export type MarketSnapshotUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
  }

  export type MarketSnapshotCreateManyInput = {
    id?: number
    createdAt: string
    payloadJson: string
  }

  export type MarketSnapshotUpdateManyMutationInput = {
    createdAt?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
  }

  export type MarketSnapshotUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
  }

  export type MacroSnapshotCreateInput = {
    createdAt: string
    payloadJson: string
  }

  export type MacroSnapshotUncheckedCreateInput = {
    id?: number
    createdAt: string
    payloadJson: string
  }

  export type MacroSnapshotUpdateInput = {
    createdAt?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
  }

  export type MacroSnapshotUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
  }

  export type MacroSnapshotCreateManyInput = {
    id?: number
    createdAt: string
    payloadJson: string
  }

  export type MacroSnapshotUpdateManyMutationInput = {
    createdAt?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
  }

  export type MacroSnapshotUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
  }

  export type SnbSnapshotCreateInput = {
    createdAt: string
    payloadJson: string
  }

  export type SnbSnapshotUncheckedCreateInput = {
    id?: number
    createdAt: string
    payloadJson: string
  }

  export type SnbSnapshotUpdateInput = {
    createdAt?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
  }

  export type SnbSnapshotUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
  }

  export type SnbSnapshotCreateManyInput = {
    id?: number
    createdAt: string
    payloadJson: string
  }

  export type SnbSnapshotUpdateManyMutationInput = {
    createdAt?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
  }

  export type SnbSnapshotUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
  }

  export type SwissOpenDataSnapshotCreateInput = {
    createdAt: string
    payloadJson: string
  }

  export type SwissOpenDataSnapshotUncheckedCreateInput = {
    id?: number
    createdAt: string
    payloadJson: string
  }

  export type SwissOpenDataSnapshotUpdateInput = {
    createdAt?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
  }

  export type SwissOpenDataSnapshotUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
  }

  export type SwissOpenDataSnapshotCreateManyInput = {
    id?: number
    createdAt: string
    payloadJson: string
  }

  export type SwissOpenDataSnapshotUpdateManyMutationInput = {
    createdAt?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
  }

  export type SwissOpenDataSnapshotUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    createdAt?: StringFieldUpdateOperationsInput | string
    payloadJson?: StringFieldUpdateOperationsInput | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ArticleTranslationListRelationFilter = {
    every?: ArticleTranslationWhereInput
    some?: ArticleTranslationWhereInput
    none?: ArticleTranslationWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ArticleTranslationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ArticleCountOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    date?: SortOrder
    authorName?: SortOrder
    authorRole?: SortOrder
    sourcesJson?: SortOrder
    imageUrl?: SortOrder
    expertQuote?: SortOrder
    keyFactsJson?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    videoUrl?: SortOrder
  }

  export type ArticleMaxOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    date?: SortOrder
    authorName?: SortOrder
    authorRole?: SortOrder
    sourcesJson?: SortOrder
    imageUrl?: SortOrder
    expertQuote?: SortOrder
    keyFactsJson?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    videoUrl?: SortOrder
  }

  export type ArticleMinOrderByAggregateInput = {
    id?: SortOrder
    slug?: SortOrder
    category?: SortOrder
    date?: SortOrder
    authorName?: SortOrder
    authorRole?: SortOrder
    sourcesJson?: SortOrder
    imageUrl?: SortOrder
    expertQuote?: SortOrder
    keyFactsJson?: SortOrder
    isVerified?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    videoUrl?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type ArticleScalarRelationFilter = {
    is?: ArticleWhereInput
    isNot?: ArticleWhereInput
  }

  export type ArticleTranslationArticleIdLocaleCompoundUniqueInput = {
    articleId: string
    locale: string
  }

  export type ArticleTranslationCountOrderByAggregateInput = {
    id?: SortOrder
    articleId?: SortOrder
    locale?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    contentHtml?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    updatedAt?: SortOrder
    expertQuote?: SortOrder
    keyFactsJson?: SortOrder
  }

  export type ArticleTranslationMaxOrderByAggregateInput = {
    id?: SortOrder
    articleId?: SortOrder
    locale?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    contentHtml?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    updatedAt?: SortOrder
    expertQuote?: SortOrder
    keyFactsJson?: SortOrder
  }

  export type ArticleTranslationMinOrderByAggregateInput = {
    id?: SortOrder
    articleId?: SortOrder
    locale?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    contentHtml?: SortOrder
    metaTitle?: SortOrder
    metaDescription?: SortOrder
    updatedAt?: SortOrder
    expertQuote?: SortOrder
    keyFactsJson?: SortOrder
  }

  export type NewsletterSubscriptionCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    source?: SortOrder
    leadMagnet?: SortOrder
    createdAt?: SortOrder
  }

  export type NewsletterSubscriptionMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    source?: SortOrder
    leadMagnet?: SortOrder
    createdAt?: SortOrder
  }

  export type NewsletterSubscriptionMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    source?: SortOrder
    leadMagnet?: SortOrder
    createdAt?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type MarketSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    payloadJson?: SortOrder
  }

  export type MarketSnapshotAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MarketSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    payloadJson?: SortOrder
  }

  export type MarketSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    payloadJson?: SortOrder
  }

  export type MarketSnapshotSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type MacroSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    payloadJson?: SortOrder
  }

  export type MacroSnapshotAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MacroSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    payloadJson?: SortOrder
  }

  export type MacroSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    payloadJson?: SortOrder
  }

  export type MacroSnapshotSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SnbSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    payloadJson?: SortOrder
  }

  export type SnbSnapshotAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SnbSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    payloadJson?: SortOrder
  }

  export type SnbSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    payloadJson?: SortOrder
  }

  export type SnbSnapshotSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SwissOpenDataSnapshotCountOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    payloadJson?: SortOrder
  }

  export type SwissOpenDataSnapshotAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SwissOpenDataSnapshotMaxOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    payloadJson?: SortOrder
  }

  export type SwissOpenDataSnapshotMinOrderByAggregateInput = {
    id?: SortOrder
    createdAt?: SortOrder
    payloadJson?: SortOrder
  }

  export type SwissOpenDataSnapshotSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type ArticleTranslationCreateNestedManyWithoutArticleInput = {
    create?: XOR<ArticleTranslationCreateWithoutArticleInput, ArticleTranslationUncheckedCreateWithoutArticleInput> | ArticleTranslationCreateWithoutArticleInput[] | ArticleTranslationUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleTranslationCreateOrConnectWithoutArticleInput | ArticleTranslationCreateOrConnectWithoutArticleInput[]
    createMany?: ArticleTranslationCreateManyArticleInputEnvelope
    connect?: ArticleTranslationWhereUniqueInput | ArticleTranslationWhereUniqueInput[]
  }

  export type ArticleTranslationUncheckedCreateNestedManyWithoutArticleInput = {
    create?: XOR<ArticleTranslationCreateWithoutArticleInput, ArticleTranslationUncheckedCreateWithoutArticleInput> | ArticleTranslationCreateWithoutArticleInput[] | ArticleTranslationUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleTranslationCreateOrConnectWithoutArticleInput | ArticleTranslationCreateOrConnectWithoutArticleInput[]
    createMany?: ArticleTranslationCreateManyArticleInputEnvelope
    connect?: ArticleTranslationWhereUniqueInput | ArticleTranslationWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ArticleTranslationUpdateManyWithoutArticleNestedInput = {
    create?: XOR<ArticleTranslationCreateWithoutArticleInput, ArticleTranslationUncheckedCreateWithoutArticleInput> | ArticleTranslationCreateWithoutArticleInput[] | ArticleTranslationUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleTranslationCreateOrConnectWithoutArticleInput | ArticleTranslationCreateOrConnectWithoutArticleInput[]
    upsert?: ArticleTranslationUpsertWithWhereUniqueWithoutArticleInput | ArticleTranslationUpsertWithWhereUniqueWithoutArticleInput[]
    createMany?: ArticleTranslationCreateManyArticleInputEnvelope
    set?: ArticleTranslationWhereUniqueInput | ArticleTranslationWhereUniqueInput[]
    disconnect?: ArticleTranslationWhereUniqueInput | ArticleTranslationWhereUniqueInput[]
    delete?: ArticleTranslationWhereUniqueInput | ArticleTranslationWhereUniqueInput[]
    connect?: ArticleTranslationWhereUniqueInput | ArticleTranslationWhereUniqueInput[]
    update?: ArticleTranslationUpdateWithWhereUniqueWithoutArticleInput | ArticleTranslationUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: ArticleTranslationUpdateManyWithWhereWithoutArticleInput | ArticleTranslationUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: ArticleTranslationScalarWhereInput | ArticleTranslationScalarWhereInput[]
  }

  export type ArticleTranslationUncheckedUpdateManyWithoutArticleNestedInput = {
    create?: XOR<ArticleTranslationCreateWithoutArticleInput, ArticleTranslationUncheckedCreateWithoutArticleInput> | ArticleTranslationCreateWithoutArticleInput[] | ArticleTranslationUncheckedCreateWithoutArticleInput[]
    connectOrCreate?: ArticleTranslationCreateOrConnectWithoutArticleInput | ArticleTranslationCreateOrConnectWithoutArticleInput[]
    upsert?: ArticleTranslationUpsertWithWhereUniqueWithoutArticleInput | ArticleTranslationUpsertWithWhereUniqueWithoutArticleInput[]
    createMany?: ArticleTranslationCreateManyArticleInputEnvelope
    set?: ArticleTranslationWhereUniqueInput | ArticleTranslationWhereUniqueInput[]
    disconnect?: ArticleTranslationWhereUniqueInput | ArticleTranslationWhereUniqueInput[]
    delete?: ArticleTranslationWhereUniqueInput | ArticleTranslationWhereUniqueInput[]
    connect?: ArticleTranslationWhereUniqueInput | ArticleTranslationWhereUniqueInput[]
    update?: ArticleTranslationUpdateWithWhereUniqueWithoutArticleInput | ArticleTranslationUpdateWithWhereUniqueWithoutArticleInput[]
    updateMany?: ArticleTranslationUpdateManyWithWhereWithoutArticleInput | ArticleTranslationUpdateManyWithWhereWithoutArticleInput[]
    deleteMany?: ArticleTranslationScalarWhereInput | ArticleTranslationScalarWhereInput[]
  }

  export type ArticleCreateNestedOneWithoutTranslationsInput = {
    create?: XOR<ArticleCreateWithoutTranslationsInput, ArticleUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutTranslationsInput
    connect?: ArticleWhereUniqueInput
  }

  export type ArticleUpdateOneRequiredWithoutTranslationsNestedInput = {
    create?: XOR<ArticleCreateWithoutTranslationsInput, ArticleUncheckedCreateWithoutTranslationsInput>
    connectOrCreate?: ArticleCreateOrConnectWithoutTranslationsInput
    upsert?: ArticleUpsertWithoutTranslationsInput
    connect?: ArticleWhereUniqueInput
    update?: XOR<XOR<ArticleUpdateToOneWithWhereWithoutTranslationsInput, ArticleUpdateWithoutTranslationsInput>, ArticleUncheckedUpdateWithoutTranslationsInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ArticleTranslationCreateWithoutArticleInput = {
    id?: string
    locale: string
    title: string
    excerpt: string
    contentHtml: string
    metaTitle?: string | null
    metaDescription?: string | null
    updatedAt?: Date | string
    expertQuote?: string | null
    keyFactsJson?: string | null
  }

  export type ArticleTranslationUncheckedCreateWithoutArticleInput = {
    id?: string
    locale: string
    title: string
    excerpt: string
    contentHtml: string
    metaTitle?: string | null
    metaDescription?: string | null
    updatedAt?: Date | string
    expertQuote?: string | null
    keyFactsJson?: string | null
  }

  export type ArticleTranslationCreateOrConnectWithoutArticleInput = {
    where: ArticleTranslationWhereUniqueInput
    create: XOR<ArticleTranslationCreateWithoutArticleInput, ArticleTranslationUncheckedCreateWithoutArticleInput>
  }

  export type ArticleTranslationCreateManyArticleInputEnvelope = {
    data: ArticleTranslationCreateManyArticleInput | ArticleTranslationCreateManyArticleInput[]
  }

  export type ArticleTranslationUpsertWithWhereUniqueWithoutArticleInput = {
    where: ArticleTranslationWhereUniqueInput
    update: XOR<ArticleTranslationUpdateWithoutArticleInput, ArticleTranslationUncheckedUpdateWithoutArticleInput>
    create: XOR<ArticleTranslationCreateWithoutArticleInput, ArticleTranslationUncheckedCreateWithoutArticleInput>
  }

  export type ArticleTranslationUpdateWithWhereUniqueWithoutArticleInput = {
    where: ArticleTranslationWhereUniqueInput
    data: XOR<ArticleTranslationUpdateWithoutArticleInput, ArticleTranslationUncheckedUpdateWithoutArticleInput>
  }

  export type ArticleTranslationUpdateManyWithWhereWithoutArticleInput = {
    where: ArticleTranslationScalarWhereInput
    data: XOR<ArticleTranslationUpdateManyMutationInput, ArticleTranslationUncheckedUpdateManyWithoutArticleInput>
  }

  export type ArticleTranslationScalarWhereInput = {
    AND?: ArticleTranslationScalarWhereInput | ArticleTranslationScalarWhereInput[]
    OR?: ArticleTranslationScalarWhereInput[]
    NOT?: ArticleTranslationScalarWhereInput | ArticleTranslationScalarWhereInput[]
    id?: StringFilter<"ArticleTranslation"> | string
    articleId?: StringFilter<"ArticleTranslation"> | string
    locale?: StringFilter<"ArticleTranslation"> | string
    title?: StringFilter<"ArticleTranslation"> | string
    excerpt?: StringFilter<"ArticleTranslation"> | string
    contentHtml?: StringFilter<"ArticleTranslation"> | string
    metaTitle?: StringNullableFilter<"ArticleTranslation"> | string | null
    metaDescription?: StringNullableFilter<"ArticleTranslation"> | string | null
    updatedAt?: DateTimeFilter<"ArticleTranslation"> | Date | string
    expertQuote?: StringNullableFilter<"ArticleTranslation"> | string | null
    keyFactsJson?: StringNullableFilter<"ArticleTranslation"> | string | null
  }

  export type ArticleCreateWithoutTranslationsInput = {
    id?: string
    slug: string
    category: string
    date: Date | string
    authorName: string
    authorRole?: string | null
    sourcesJson: string
    imageUrl?: string | null
    expertQuote?: string | null
    keyFactsJson?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    videoUrl?: string | null
  }

  export type ArticleUncheckedCreateWithoutTranslationsInput = {
    id?: string
    slug: string
    category: string
    date: Date | string
    authorName: string
    authorRole?: string | null
    sourcesJson: string
    imageUrl?: string | null
    expertQuote?: string | null
    keyFactsJson?: string | null
    isVerified?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    videoUrl?: string | null
  }

  export type ArticleCreateOrConnectWithoutTranslationsInput = {
    where: ArticleWhereUniqueInput
    create: XOR<ArticleCreateWithoutTranslationsInput, ArticleUncheckedCreateWithoutTranslationsInput>
  }

  export type ArticleUpsertWithoutTranslationsInput = {
    update: XOR<ArticleUpdateWithoutTranslationsInput, ArticleUncheckedUpdateWithoutTranslationsInput>
    create: XOR<ArticleCreateWithoutTranslationsInput, ArticleUncheckedCreateWithoutTranslationsInput>
    where?: ArticleWhereInput
  }

  export type ArticleUpdateToOneWithWhereWithoutTranslationsInput = {
    where?: ArticleWhereInput
    data: XOR<ArticleUpdateWithoutTranslationsInput, ArticleUncheckedUpdateWithoutTranslationsInput>
  }

  export type ArticleUpdateWithoutTranslationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorRole?: NullableStringFieldUpdateOperationsInput | string | null
    sourcesJson?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    expertQuote?: NullableStringFieldUpdateOperationsInput | string | null
    keyFactsJson?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArticleUncheckedUpdateWithoutTranslationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    authorName?: StringFieldUpdateOperationsInput | string
    authorRole?: NullableStringFieldUpdateOperationsInput | string | null
    sourcesJson?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    expertQuote?: NullableStringFieldUpdateOperationsInput | string | null
    keyFactsJson?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    videoUrl?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArticleTranslationCreateManyArticleInput = {
    id?: string
    locale: string
    title: string
    excerpt: string
    contentHtml: string
    metaTitle?: string | null
    metaDescription?: string | null
    updatedAt?: Date | string
    expertQuote?: string | null
    keyFactsJson?: string | null
  }

  export type ArticleTranslationUpdateWithoutArticleInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    contentHtml?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expertQuote?: NullableStringFieldUpdateOperationsInput | string | null
    keyFactsJson?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArticleTranslationUncheckedUpdateWithoutArticleInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    contentHtml?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expertQuote?: NullableStringFieldUpdateOperationsInput | string | null
    keyFactsJson?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ArticleTranslationUncheckedUpdateManyWithoutArticleInput = {
    id?: StringFieldUpdateOperationsInput | string
    locale?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    contentHtml?: StringFieldUpdateOperationsInput | string
    metaTitle?: NullableStringFieldUpdateOperationsInput | string | null
    metaDescription?: NullableStringFieldUpdateOperationsInput | string | null
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expertQuote?: NullableStringFieldUpdateOperationsInput | string | null
    keyFactsJson?: NullableStringFieldUpdateOperationsInput | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}