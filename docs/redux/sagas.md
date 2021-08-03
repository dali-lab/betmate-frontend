# Redux Saga Setup

## Saga Background

The [redux-saga](https://redux-saga.js.org/) package is an alternative to the typical [redux-thunk](https://www.npmjs.com/package/redux-thunk) method of handling asynchronous application side effects. Examples of these side effects range from simple API calls to websockets and browser storage calls. These side-effects become increasingly complicated as an application grows.

The `redux-saga` package solves many of these issues through its redux middleware, which you can think of as a co-processor to your application. To explain this, let's first look at the typical redux flow through an application (i.e. an application without redux middleware):

```text
connected component(s) => dispatch action to redux => call all reducers with action => update application state => rerender updated connected component(s)
```

Redux middleware adds an additional step to this process:

```text
connected component(s) => dispatch action to redux => {{ middleware can choose to handle or not handle action }} => call all reducers with action => update application state => rerender updated connected component(s)
```

Redux passes all actions through the attached middleware in a way that is very similar to connect / express middleware. Each attached middleware can chose to interact with every `dispatch`ed action, and once the middleware has completed its task it then calls a passed `next` function which tells redux to pass the action to the next step in the action's lifecycle. As such, the `redux-saga` middleware will have access to both `dispatch`ed actions as well as the ability to `dispatch` actions to the reducers.

## Generator Functions

Redux sagas rely heavily on `generator functions`, an ES6 concept intruduced to simplify delaying execution of a given block of code. Detailed documentation can be found [here on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) and [here on redux-saga](https://redux-saga.js.org/docs/introduction/BeginnerTutorial). All sagas are written as generator functions, and as such this is a core concept within the redux-saga paradigm.

## Saga Basics

From personal experience, I find the most effective way to think about the redux-saga middleware is as a sort of "co-processor" to your application that handles all of the messy side-effects (e.g. API calls, websockets, local storage, etc...). This "co-processor" of sorts is connected to the redux flow between the component's `dispatch` calls and the reducers handling the incoming action. Because of this, we can send information to the middleware through dispatched actions. For example, we can tell the middleware to connect to a websocket if it receives the following action:

```js
{ type: "INITIALIZE_SOCKET", payload: {} }
```

We can also tell the middleware to close that websocket after it has been created by dispatching the following action:

```js
{ type: "CLOSE_SOCKET", payload: {} }
```

When we first run the middleware in the `src/index.tsx` file, we specify the behavior of the middleware using a specific type of generator function known as a `saga`. Sagas are generator functions that can configure the `redux-saga` middleware using specific functions from the `redux-saga/effects` import. Below are examples of some of these helper functions (also known as effect creators):

```text
put(action: any): void --- dispatches an action to the reducers
take(fn: (action: any) => boolean): action --- calls the predicate function (fn) on all dispatched actions, and returns actions for which this function returns true
call(fn: any, ...args: any): result --- calls the passed function (fn) with all passed arguments (...args)
fork(saga: Generator): instance --- runs a child saga
spawn(saga: Generator): void --- runs a child saga
```

You can find the [redux-saga API spec here](https://redux-saga.js.org/docs/api) with all of these helper functions.

At first it may seem strange to use these helper functions to call functions, for example, but herein lies the true power of redux saga. All these helpers (effect creators) do is take in some configuration and return a simple JS object. These objects are then read by the middleware and tell it how to handle what you want it to do. For example, the effect creator `fork` called with a `passedSaga` saga parameter will create the following effect:

```js
{
  "@@redux-saga/IO": true,
  "combinator": false,
  "type": "FORK",
  "payload": {
    "context": null,
    "args": [],
    "detached": false,
    fn: function passedSaga()
  }
}
```

The middleware will then process this effect internally and take any required action to fulful the tasks contained within the effect. This is why we `yield` effects within sagas, since internally the middleware will be calling `saga.next()` and expecting to receive an effect as the `yield`ed value.

For more information and an [in-depth tutorial](https://redux-saga.js.org/docs/introduction/BeginnerTutorial), visit the [redux-saga package documentation](https://redux-saga.js.org/docs/basics/DeclarativeEffects).

## Types of Sagas

Within this application there are two types of sagas: `watchers` and `workers`. Watchers watch for actions being dispatched to the redux store, and when a watcher finds an action it's watching for it calls a corresponding worker saga. Worker sagas contain the logic that interacts with application side-effects (e.g. API calls). In this application we have combined the watchers and workers for basic CRUD sagas (`auth`, `game`, `user`, and `wager`), an example of which is below:

```typescript
export function* watchCreateGame() {
  while (true) {
    try {
      const action: CreateGameActions = yield take((a: Actions) => (a.type === 'CREATE_GAME' && a.status === 'REQUEST'));
      if (action.status !== 'REQUEST') return; // Type protection only

      const response: RequestReturnType<FetchGameData> = yield call(gameRequests.createGame, action.payload.state);
      yield put<Actions>({ type: 'CREATE_GAME', payload: { game: response.data.game }, status: 'SUCCESS' });
    } catch (error) {
      yield put<Actions>({ type: 'CREATE_GAME', payload: getErrorPayload(error), status: 'FAILURE' });
    }
  }
}
```

This saga pauses its execution until an action of type `CREATE_GAME` with a status of `REQUEST` is dispatched to the store. Once it receives such an action, it then tells the saga middleware to call the `gameRequests.createGame` helper function with any parameters it needs (in this case just a `gameState` parameter). The execution of the saga again pauses until the middleware tells the saga to resume (which will be when the API call within the `createGame` request has completed). Finally the saga will tell the middleware to dispatch the following action to the store, and again wait for an action of type `CREATE_GAME` with a status of `REQUEST`:

```js
{ type: 'CREATE_GAME', payload: { game: response.data.game }, status: 'SUCCESS' }
```

In the event the API call fails, the saga will dispatch the following error action to the reducer:

```js
{ type: 'CREATE_GAME', payload: getErrorPayload(error), status: 'FAILURE' }
```

Since the saga is wrapped in a `while` loop, this process will repeat until the tab closes.

> **Note:** since the saga is blocked while waiting for the API call to complete, it is possible that the saga could miss a `CREATE_GAME` action `dispatch`ed to the store. Since this action type is user-triggered this is extremely unlikely, but should still be noted. This could be fixed by `fork`ing a `worker` saga immediately once an action has been matched, but this style has been kept for conceptual simplicity for the time being.

## Saga Structure

The following diagram lays out the structure of the sagas for this application. The tree's branches show which methods are called by which other method (e.g. the `authSaga` saga is called by the `rootSaga` saga, and the `authRequests.signInUser` request method is called by the `watchAuthUser` saga). Below is a key for the diagram:

```text
- sampleSaga => basic saga
- sampleWatcher { ACTION_TYPE, ACTION_STATUS } => saga watching for an action with the specified `type` and `status` fields
- sampleWatcher [ channelName ] => saga watching for emissions to a saga channel
- [sampleFunctionCall]() => helper function (not a saga) called by the parent saga
- └──{ AUTH_USER, SUCCESS } => action dispatched by the parent saga
- └──*channelName (channel description) => source of channel events with description
- └──!... => error handling logic, where "..." represents generic logic (e.g. a dispatched action, a called function, etc...)
```

```text
rootSaga
├───authSaga
│   └───watchAuthUser { AUTH_USER, REQUEST }
│       ├───[authRequests.signInUser]()
│       ├───{ AUTH_USER, SUCCESS }
│       └──!{ AUTH_USER, FAILURE }
├───gameSaga
│   ├───watchCreateGame { CREATE_GAME, REQUEST }
│   |   ├───[gameRequests.createGame]()
│   |   ├───{ CREATE_GAME, SUCCESS }
│   |   └──!{ CREATE_GAME, FAILURE }
│   ├───watchFetchGameById { FETCH_GAME, REQUEST }
│   |   ├───[gameRequests.fetchGame]()
│   |   ├───{ FETCH_GAME, SUCCESS }
│   |   └──!{ FETCH_GAME, FAILURE }
│   ├───watchUpdateGameById { UPDATE_GAME, REQUEST }
│   |   ├───[gameRequests.updateGame]()
│   |   ├───{ UPDATE_GAME, SUCCESS }
│   |   └──!{ UPDATE_GAME, FAILURE }
│   └───watchDeleteGameById { DELETE_GAME, REQUEST }
│       ├───[gameRequests.deleteGame]()
│       ├───{ DELETE_GAME, SUCCESS }
│       └──!{ DELETE_GAME, FAILURE }
├───userSaga
│   ├───watchCreateUser { CREATE_USER, REQUEST }
│   |   ├───[userRequests.createUser]()
│   |   ├───{ CREATE_USER, SUCCESS }
│   |   └──!{ CREATE_USER, FAILURE }
│   ├───watchFetchUserById { FETCH_USER, REQUEST }
│   |   ├───[userRequests.fetchUser]()
│   |   ├───{ FETCH_USER, SUCCESS }
│   |   └──!{ FETCH_USER, FAILURE }
│   ├───watchUpdateUserById { UPDATE_USER, REQUEST }
│   |   ├───[userRequests.updateUser]()
│   |   ├───{ UPDATE_USER, SUCCESS }
│   |   └──!{ UPDATE_USER, FAILURE }
│   └───watchDeleteUserById { DELETE_USER, REQUEST }
│       ├───[userRequests.deleteUser]()
│       ├───{ DELETE_USER, SUCCESS }
│       └──!{ DELETE_USER, FAILURE }
├───wagerSaga
│   ├───watchCreateWager { CREATE_WAGER, REQUEST }
│   |   ├───[wagerRequests.createWager]()
│   |   ├───{ CREATE_WAGER, SUCCESS }
│   |   └──!{ CREATE_WAGER, FAILURE }
│   ├───watchFetchWagerById { FETCH_WAGER, REQUEST }
│   |   ├───[wagerRequests.fetchWager]()
│   |   ├───{ FETCH_WAGER, SUCCESS }
│   |   └──!{ FETCH_WAGER, FAILURE }
│   ├───watchUpdateWagerById { UPDATE_WAGER, REQUEST }
│   |   ├───[wagerRequests.updateWager]()
│   |   ├───{ UPDATE_WAGER, SUCCESS }
│   |   └──!{ UPDATE_WAGER, FAILURE }
│   └───watchDeleteWagerById { DELETE_WAGER, REQUEST }
│       ├───[wagerRequests.deleteWager]()
│       ├───{ DELETE_WAGER, SUCCESS }
│       └──!{ DELETE_WAGER, FAILURE }
└───watchSockets { INITIALIZE_SOCKET }, { CLOSE_SOCKET }
    ├───[createSocket]()
    ├───makeMoveHandler { MAKE_MOVE, REQUEST }
    |   ├───[socket.emit]()
    |   ├───{ MAKE_MOVE, SUCCESS }
    |   └──!{ MAKE_MOVE, FAILURE }
    ├───updateGameStateHandler [ updateGameState ]
    |   ├───*updateGameState ("new_move" socket event)
    |   ├───{ UPDATE_GAME_STATE, SUCCESS }
    |   └──!{ UPDATE_GAME_STATE, FAILURE }
    ├───errorHandler [ error ]
    |   ├───*error ("error" socket event")
    |   ├───{ SOCKET_ERROR, SUCCESS }
    |   └──!{ SOCKET_ERROR, FAILURE }
    └───[closeSocket]()
```
