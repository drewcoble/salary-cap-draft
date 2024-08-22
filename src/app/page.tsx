import Image from "next/image";
import styles from "./page.module.css";

interface IDefense {
  active?: boolean;
  position?: string;
  sport?: string;
  player_id: string;
  fantasy_positions?: string[];
  last_name?: string;
  first_name?: string;
  injury_status?: string;
  team?: string;
}
interface IPlayer {
  high_school?: string;
  age?: number;
  college?: string;
  first_name?: string;
  search_first_name?: string;
  last_name?: string;
  pandascore_id?: string | number;
  stats_id?: number;
  practice_description?: string;
  injury_body_part?: string;
  practice_participation?: string;
  active?: boolean;
  height?: string;
  opta_id?: string | number;
  swish_id?: number;
  metadata?: Record<string, string>;
  years_exp?: number;
  player_id: string;
  competitions?: string[];
  status?: string;
  fantasy_data_id?: number;
  birth_date?: string;
  weight?: string;
  injury_notes?: string;
  fantasy_positions?: string[];
  oddsjam_id?: string;
  search_last_name?: string;
  sportradar_id?: string;
  search_rank?: number;
  yahoo_id?: number;
  rotoworld_id?: number;
  news_updated?: number;
  birth_state?: string;
  hashtag?: string;
  team_abbr?: string;
  gsis_id?: string | number;
  team_changed_at?: number;
  search_full_name?: string;
  rotowire_id?: number;
  depth_chart_order?: number;
  depth_chart_position?: string;
  birth_country?: string;
  espn_id?: number;
  position?: string;
  injury_status?: string;
  team?: string;
  full_name?: string;
  birth_city?: string;
  sport?: string;
  injury_start_date?: string;
  number?: number;
}

const ELIGIBLE_POSITIONS = ["QB", "RB", "TE", "WR", "DEF"];
// const checkPositions = (positions: string[]) => {
//   if (positions === undefined) {
//     return true;
//   }
//   let isEligible = false;
//   positions.forEach((p) => {
//     if (ELIGIBLE_POSITIONS.includes(p)) {
//       isEligible = true;
//     }
//   });
//   return isEligible;
// };

const getPlayers = async () => {
  const data = await fetch("https://api.sleeper.app/v1/players/nfl").then(
    (res) => res.json()
  );
  const players = Object.keys(data)
    .map((key) => data[key])
    .sort((a, b) => a.search_rank - b.search_rank);
  const allPlayers = players.filter(
    (p) =>
      ELIGIBLE_POSITIONS.includes(p.position) &&
      // (p.yahoo_id > 0 || p.position === "DEF") &&
      (p.depth_chart_order > 0 || p.position === "DEF")
    // p.status !== "Inactive" &&
    // p.active
  );
  const qbs: IPlayer[] = allPlayers
    .filter((p) => p.position === "QB")
    .slice(0, 60);
  const rbs: IPlayer[] = allPlayers
    .filter((p) => p.position === "RB")
    .slice(0, 120);
  const tes: IPlayer[] = allPlayers
    .filter((p) => p.position === "TE")
    .slice(0, 60);
  const wrs: IPlayer[] = allPlayers
    .filter((p) => p.position === "WR")
    .slice(0, 120);
  const defs: IDefense[] = allPlayers.filter((p) => p.position === "DEF");
  return { allPlayers, qbs, rbs, tes, wrs, defs };
};

export default async function Home() {
  const { allPlayers, qbs, rbs, tes, wrs, defs } = await getPlayers();
  console.log("players: ", allPlayers);

  return (
    <main className={styles.main}>
      <div className={styles.center}>
        <div>
          {qbs.map((p) => (
            <div
              key={p.player_id}
              style={{ alignItems: "center", display: "flex" }}
            >
              <span
                style={{
                  backgroundColor: "burlywood",
                  borderRadius: 6,
                  fontSize: "0.6rem",
                  margin: 5,
                  padding: 5,
                }}
              >
                QB
              </span>
              {p.full_name}&nbsp;
              <span style={{ fontVariant: "small-caps" }}>
                {" "}
                - {p.team ?? "FA"}
              </span>
            </div>
          ))}
        </div>

        <div>
          {rbs.map((p) => (
            <div
              key={p.player_id}
              style={{ alignItems: "center", display: "flex" }}
            >
              <span
                style={{
                  backgroundColor: "aquamarine",
                  borderRadius: 6,
                  fontSize: "0.6rem",
                  margin: 5,
                  padding: 5,
                }}
              >
                RB
              </span>
              {p.full_name}&nbsp;
              <span style={{ fontVariant: "small-caps" }}>
                {" "}
                - {p.team ?? "FA"}
              </span>
            </div>
          ))}
        </div>

        <div>
          {wrs.map((p) => (
            <div
              key={p.player_id}
              style={{ alignItems: "center", display: "flex" }}
            >
              <span
                style={{
                  backgroundColor: "goldenrod",
                  borderRadius: 6,
                  fontSize: "0.6rem",
                  margin: 5,
                  padding: 5,
                }}
              >
                WR
              </span>
              {p.full_name}&nbsp;
              <span style={{ fontVariant: "small-caps" }}>
                {" "}
                - {p.team ?? "FA"}
              </span>
            </div>
          ))}
        </div>

        <div>
          {tes.map((p) => (
            <div
              key={p.player_id}
              style={{ alignItems: "center", display: "flex" }}
            >
              <span
                style={{
                  backgroundColor: "lavender",
                  borderRadius: 6,
                  fontSize: "0.6rem",
                  margin: 5,
                  padding: 5,
                }}
              >
                TE
              </span>
              {p.full_name}&nbsp;
              <span style={{ fontVariant: "small-caps" }}>
                {" "}
                - {p.team ?? "FA"}
              </span>
            </div>
          ))}
        </div>

        <div>
          {defs.length > 0 &&
            defs.map((p) => (
              <div
                key={p.player_id}
                style={{ alignItems: "center", display: "flex" }}
              >
                <span
                  style={{
                    backgroundColor: "saddlebrown",
                    borderRadius: 6,
                    fontSize: "0.6rem",
                    margin: 5,
                    padding: 5,
                  }}
                >
                  D&nbsp;/&nbsp;ST
                </span>
                {p.player_id}&nbsp;
                <span style={{ fontVariant: "small-caps" }}>d/st</span>
              </div>
            ))}
        </div>
      </div>

      {/* <div className={styles.grid}>
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Docs <span>-&gt;</span>
          </h2>
          <p>Find in-depth information about Next.js features and API.</p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Learn <span>-&gt;</span>
          </h2>
          <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Templates <span>-&gt;</span>
          </h2>
          <p>Explore starter templates for Next.js.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
          className={styles.card}
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2>
            Deploy <span>-&gt;</span>
          </h2>
          <p>
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div> */}
    </main>
  );
}
