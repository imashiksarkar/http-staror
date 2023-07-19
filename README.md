# Http-Status-Error

### With Typescript

```typescript
import { Err, Http, Status } from "http-status-error"
```

```typescript
Http.setStatus("Accepted") // {status: 'Accepted',statusCode: 202,message: 'Accepted'}
```

```typescript
Http.setStatus("Accepted").setStatusCode(500) // { status: 'Accepted', statusCode: 500, message: 'Accepted' }

// Note: If you don't set status code explecitely then the status code would be infered from the status you set.

//Most of the time would not want to set the status code explecitely unless you are setting a custom status that does not exist in the package
```

```typescript
Http.setStatus("Accepted").setStatusCode(500).setMessage("It is accepted") // { status: 'Accepted', statusCode: 500, message: 'It is accepted' }

// Note: If you don't set a message explecitely then the message would be the same as status
```

```typescript
Http.setStatus("x-hello").setStatusCode(303).setMessage("custom status") // { status: 'hello', statusCode: 303, message: 'custom status' }

// Note: To set a custom status you must prefix with "x-" also you have to set a status code otherwise it will be set to 200
```
