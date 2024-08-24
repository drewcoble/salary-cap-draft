import IDefense from "@/interfaces/defense";
import IPlayer from "@/interfaces/player";
import IPlayerObj from "@/interfaces/playerObj";
import { ELIGIBLE_POSITIONS } from "@/utilities/constants";

const getPlayers = async (players?: any[]) => {
  //   const data = await fetch("https://api.sleeper.app/v1/players/nfl", {
  //     cache: "force-cache",
  //   }).then((res) => res.json());
  const sortedPlayers = players?.sort((a, b) => a.search_rank - b.search_rank);
  const allPlayers = sortedPlayers?.filter(
    (p) =>
      ELIGIBLE_POSITIONS.includes(p.position) &&
      // (p.yahoo_id > 0 || p.position === "DEF") &&
      (p.depth_chart_order > 0 || p.position === "DEF")
    // p.status !== "Inactive" &&
    // p.active
  );
  const qbs: IPlayer[] =
    allPlayers?.filter((p) => p.position === "QB").slice(0, 60) ?? [];
  const rbs: IPlayer[] =
    allPlayers?.filter((p) => p.position === "RB").slice(0, 120) ?? [];
  const tes: IPlayer[] =
    allPlayers?.filter((p) => p.position === "TE").slice(0, 60) ?? [];
  const wrs: IPlayer[] =
    allPlayers?.filter((p) => p.position === "WR").slice(0, 120) ?? [];
  const defs: IDefense[] =
    allPlayers?.filter((p) => p.position === "DEF") ?? [];
  return { allPlayers, qbs, rbs, tes, wrs, defs } as IPlayerObj;
};

export default getPlayers;
