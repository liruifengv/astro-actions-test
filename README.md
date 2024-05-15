# Test Astro Actions API

## Astro Actions API，提供客户端直接 type-safe 调用服务端 function 的方式。

[相关文档](https://docs.astro.build/en/reference/configuration-reference/#experimentalactions)

[RFC](https://github.com/withastro/roadmap/blob/actions/proposals/0046-actions.md)


## Usage example

### 普通接收 json 的 Action

在 src/actions/index.ts 中定义

```ts
import { defineAction, z } from "astro:actions";

export const server = {
  click: defineAction({
    input: z.object({
      name: z.string(),
      massage: z.string(),
    }),
    handler: async ({ name }) => {
      console.log(`Received name: ${name}`);
      return { success: true, data: `Hello ${name}` };
    },
  }),
};
```

React 客户端组件：`ActionButton.tsx`

```tsx

import { actions } from "astro:actions";

export function ActionButton() {
  return (
    <button onClick={async (e) => {
          e.preventDefault();
          console.log('clicked');
          const result = await actions.click({
            name: 'liruifengv',
            massage: 'hello',
          });
          console.log(result);
          if (result.success) {
            alert(result.data);
          }
        }}>
      click me
    </button>
  );
}
```

### 接收 from 的 Action

在 src/actions/index.ts 中定义

```ts
import { defineAction, z } from "astro:actions";

export const server = {
  signUp: defineAction({
    accept: "form",
    input: z.object({
      username: z.string(),
      email: z.string().email(),
      password: z.string().min(8),
    }),
    handler: async ({ username, email, password }) => {
      console.log(`Received username: ${username}, email: ${email}`);
      return { success: true };
    },
  }),
};
```

React 客户端组件：`ActionForm.tsx`

```tsx
import { actions } from "astro:actions";

export function ActionForm() {
  return (
    <form
      style={{ display: "flex", flexDirection: "column", width: "200px"}}
      onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const result = await actions.signUp(formData);
        if (result.success) {
          alert("Sign up successful!");
        }
      }}
    >
      <label htmlFor="username">username</label>
      <input id="username" type="text" name="username" />
      <label htmlFor="email">email</label>
      <input id="email" type="email" name="email" />
      <label htmlFor="password">password</label>
      <input id="password" type="password" name="password" />
      <br/>
      <button type="submit">Sign up</button>
    </form>
  );
}
```

### No js 渐进增强
在 src/actions/index.ts 中定义

```ts
import { defineAction, z } from "astro:actions";

export const server = {
  newsletter: defineAction({
    accept: "form",
    input: z.object({
      email2: z.string().email(),
      receivePromo: z.boolean(),
    }),
    handler: async ({ email2, receivePromo }) => {
      return { success: true };
    },
  }),
};
```
React 客户端组件：`ActionFormNoJS.tsx`

form 上增加 `method="POST"`。
新增一个 input 设置 `...getActionProps(actions.newsletter)`。

就会在没有 js 的情况下，通过 form 提交数据。

```tsx
import { actions, getActionProps } from "astro:actions";

export function ActionFormNoJS() {
  return (
    <form
      method="POST"
    >
      <input {...getActionProps(actions.newsletter)} />
      <label htmlFor="email2">Email</label>
      <input name="email2" type="email" id="email2" />

      <label htmlFor="receivePromo">Receive promotional emails</label>
      <input name="receivePromo" type="checkbox" id="receivePromo" checked onChange={()=>{
        console.log("checked")
      }}/>

      <button type="submit">Sign Up</button>
    </form>
  );
}
```

### 自定义错误与错误处理

在 src/actions/index.ts 中定义

throw 一个 `ActionError`，可以自定义错误码与错误信息。

```ts
import { defineAction, z } from "astro:actions";

export const server = {
  customError: defineAction({
    input: z.object({
      name: z.string(),
    }),
    handler: async ({ name }) => {
      const { cookies } = getApiContext();
      console.log(`cookies: ${cookies.get("refreshToken")?.value}`);
      throw new ActionError({
        code: "BAD_REQUEST",
        message: "Custom error message",
      });
    },
  }),
};
```

React 客户端组件：`ActionCustomError.tsx`

使用 `actions.customError.safe` 进行安全调用，会在 zod 校验参数失败时返回 `InputError`。

使用 `isInputError` 判断是否是参数错误。

```tsx
import { actions, isInputError } from "astro:actions";

export function ActionCustomError() {
  return (
    <button onClick={async (e) => {
          e.preventDefault();
          console.log('clicked');
          const { data, error }  = await actions.customError.safe({
            name: 'liruifengv',
          });
          if (error) {
            if (isInputError(error)) {
              console.log("Handle Input error: ", error.fields);
            } else {
              console.log("Handle other errors: ", error.status, error.message);
            }
          } else {
            console.log("Success", data);
          }
        }}>
      click me
    </button>
  );
}
```