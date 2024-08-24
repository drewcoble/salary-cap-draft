import IDefense from "./defense";
import IPlayer from "./player";

export default interface IPlayerObj {
  allPlayers: any[];
  qbs: IPlayer[];
  rbs: IPlayer[];
  tes: IPlayer[];
  wrs: IPlayer[];
  defs: IDefense[];
}
