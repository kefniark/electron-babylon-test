import { Action } from 'redux';

export interface IAction extends Action {}
export interface IActionWithPayload<T> extends IAction {
  readonly payload: T;
}

interface IActionCreator<T> {
  readonly type: string;
  (payload: T): IActionWithPayload<T>;

  test(action: IAction): action is IActionWithPayload<T>;
}

interface IActionCreatorVoid {
  readonly type: string;
  (): IAction;

  test(action: IAction): action is IAction;
}

export const actionCreator = <T>(type: string): IActionCreator<T> =>
  Object.assign((payload: T): any => ({ type, payload }), {
    type,
    test(action: IAction): action is IActionWithPayload<T> {
      return action.type === type;
    }
  });

export const actionCreatorVoid = (type: string): IActionCreatorVoid =>
  Object.assign((): any => ({ type }), {
    type,
    test(action: IAction): action is IAction {
      return action.type === type;
    }
  });

export function getStaticPath(file: string) {
  const {app} = require('electron').remote;
  const path =  require('path');

  let rootFolder = "";
  if (process.env.NODE_ENV === 'development') {
    rootFolder = path.join(process.cwd(), 'app/assets');
  } else if (app.getAppPath().endsWith("app")) {
    rootFolder = path.join(app.getAppPath(), './assets/');
  } else {
    rootFolder = path.join(__dirname, 'assets/');
  }

  return path.join(rootFolder, file);
}