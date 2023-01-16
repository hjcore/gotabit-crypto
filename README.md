# Next.js With Mantine

A template use next.js with eslint, prettier, mantine.

Support deploy with Docker, Cloudflare pages, Google Cloud Run.

## Demo

https://pages.hjcore.io

## Install

```
git clone https://github.com/hjcore/cf-pages.git
cd cf-pages
```

Local dev
```
yarn install
yarn dev
```

Local run production
```
yarn build
yarn start
```

Local build docker
```
./aa
./aa test

```

## Features

#### Theme

theme provider: https://mantine.dev/theming/mantine-provider/
theme config: https://mantine.dev/guides/dark-theme/

#### Store

Global state manager based on redux/toolkit, you can find more information on redux/toolkit's documentation: https://redux-toolkit.js.org/

#### Notifications

global notification mechanism, Based on the case u saw in Index.tsx. The entire notification progress is based on mantine ui's notification package, u can find all the apis on it's documentation: https://mantine.dev/others/notifications/

##### Recommended Notification System Code Orgnization

```ts
// deps
import { showNotification } from "@mantine/notifications";

// messageDispatcher.ts

export const paymentSuccessMessage = "The payment is successful. Thanks for your support";
export const loginFailedMessage = "The password or username is incorrectly, please try again later";

export successNotifyDispatcher = (message: string) => {
  return showNotification({
    title: "Congratulations",
    message,
    color: "green"
  });
}

export errorNotifyDispatcher = (message: string) => {
  return showNotification({
    title: "Warning",
    message,
    color: "red"
  })
}
```

You can invoke success notify method or error notify method at any parts of your code

```tsx
// payment.tsx
const startPayment = useCallback(async () => {
  ....
  const paymentResult = await startPayment();
  // if paymeny success, u can notify user
  if (paymentResult.code === 200) successNotifyDispatcher(paymentSuccessMessage);
  ...
}, []);
```

```tsx
// renew.tsx
const startRenew = useCallback(async () => {
  ....
  const RenewResult = await startRenew();
  if (RenewResult.code === 200) successNotifyDispatcher(paymentSuccessMessage);
  ...
}, []);
```

After this, u will find all your message code in one file, it's very convenient to maintain these code, and if some message will be mutate, u only need to modify one file 

## Thanks

https://nextjs.org/

https://mantine.dev/

https://pages.cloudflare.com/

## License

This software is licensed under the MIT license.

© 2023