# Http-Staror

#### With Typescript

### Http

```typescript
import { Err, Http, Status } from "http-staror"
```

```typescript
Http.setStatus("Accepted") // {status: 'Accepted',statusCode: 202,message: 'Accepted'}
```

```typescript
Http.setStatus("Accepted").setStatusCode(500) // { status: 'Accepted', statusCode: 500, message: 'Accepted' }

// Note: If you don't set status code explicitly then the status code would be inferred from the status you set.

//Most of the time would not want to set the status code explicitly unless you are setting a custom status that does not exist in the package
```

```typescript
Http.setStatus("Accepted").setStatusCode(500).setMessage("It is accepted") // { status: 'Accepted', statusCode: 500, message: 'It is accepted' }

// Note: If you don't set a message explicitly then the message would be the same as status
```

```typescript
Http.setStatus("x-hello").setStatusCode(303).setMessage("custom status") // { status: 'hello', statusCode: 303, message: 'custom status' }

// Note: To set a custom status you must prefix with "x-" also you have to set a status code otherwise it will be set to 200
```

### Err

```typescript
/** Supported Functions ⬇⬇
 * setProduction()
 * setStatus()
 * setFilePath()
 * setWhere()
 * setIsOperational()
 * setLineNumber()
 * setMessage()
 * setNoStack()
 * setStatusCode()
 * setUniqueIdentifier()
 */
```

```typescript
Err.setStatus("Ok").setMessage("custom status")

// Output ⬇
{
  filePath: null
  isOperational: true
  isProduction: false
  lineNumber: null
  message: "custom status""
  stack: "Error: custom status"\n    at _a2.setMessage (http://localhost:5173/node_modules/.vite/deps/http-staror.js?v=a66ceed3:146:39)\n    at http://localhost:5173/src/main.ts:2:39"
  status: "Ok"
  statusCode: 202
  uniqueIdentifier: null
  where: null
}

```

```typescript
Err.setProduction().setStatus("Ok").setMessage("Something Went Wrong!")

// Output ⬇
{
  filePath: null
  isOperational: true
  isProduction: true
  lineNumber: null
  message: "Something Went Wrong!"
  stack: null
  status: "Ok"
  statusCode: 200
  uniqueIdentifier: null
  where: null
}

// Note: Only set production for testing. This package already contains some to code to detect if it is in production or development mode.

// It will look at process.env.NODE_ENV to detect the mode

Err.setProduction(false).setStatus("Ok").setMessage("Something Went Wrong!")

// Warning: You can also setProduction to false therefore it will will be set to development mode even though your application is running in production mode.
```

```typescript
Err.setStatus("Ok").setMessage("Something Went Wrong!").setNoStack()

// Output ⬇
{
  filePath: null
  isOperational: true
  isProduction: true
  lineNumber: null
  message: "Something Went Wrong!"
  stack: null
  status: "Ok"
  statusCode: 200
  uniqueIdentifier: null
  where: null
}

// Note: You can set it to no stack mode therefore the stack will be null in development. In production stack is always null.
```

```typescript
Err.setStatus("Ok")
  .setMessage("Something Went Wrong!")
  .setNoStack()
  .setIsOperational(false)

// Output ⬇
{
  filePath: null
  isOperational: false
  isProduction: true
  lineNumber: null
  message: "Something Went Wrong!"
  stack: null
  status: "Ok"
  statusCode: 200
  uniqueIdentifier: null
  where: null
}

// Note: You can set is operational to false. By default it is true. If there is any unhandled error in the application that error won't have is operational property.
```

```typescript
// You can check if an error is instance your custom error
console.log(e.message instanceof Err) // boolean
```

```typescript
Err.setStatus("Ok")
  .setMessage("Something Went Wrong!")
  .setFilePath("src/app.ts")
  .setWhere("inside main function")
  .setLineNumber(24)
  .setUniqueIdentifier("axdf")
  .setNoStack()

// Output ⬇
{
  filePath: "src/app.ts"
  isOperational: true
  isProduction: true
  lineNumber: 24
  message: "Something Went Wrong!"
  stack: null
  status: "Ok"
  statusCode: 200
  uniqueIdentifier: "axdf"
  where: "inside main function"
}
```

```typescript
// you can throw error like this
try {
  //...do this
} catch (error) {
  throw Err.setStatus("InternalServerError").setWhere(
    "getVideosDurationString()"
  )
}

// This way structure of the error object is always same and predictable.
```

### Status

```typescript
console.log(Status.Ok)
// {value: "Ok", statusCode: 200}
```
