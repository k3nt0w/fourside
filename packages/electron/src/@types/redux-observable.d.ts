import { RootAction as Action } from "@renderer/states/interfaces"

import { Observable } from "rxjs"

declare module "redux-observable" {
  function ofType<ActionType extends Action["type"]>(
    ...key: ActionType[]
  ): (
    source: Observable<Action>
  ) => Observable<Extract<Action, { type: ActionType }>>;
}

