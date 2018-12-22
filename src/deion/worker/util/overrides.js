// @flow

import type {
    Names,
    WorkerOverridesConstants,
    WorkerOverridesCore,
    WorkerOverridesUtil,
} from "../../common/types";

const overrides: {
    constants: WorkerOverridesConstants,
    core: WorkerOverridesCore,
    names: Names,
    util: WorkerOverridesUtil,
    views: {
        [key: string]: any,
    },
} = {
    constants: {
        COMPOSITE_WEIGHTS: {},
        PLAYER_STATS_TABLES: {},
        POSITIONS: [],
        RATINGS: [],
        TEAM_STATS_TABLES: {},
    },
    core: {
        GameSim: undefined,
        player: {},
        season: {},
        team: {},
    },
    names: {
        first: {},
        last: {},
    },
    util: {
        achievements: [],
        advStats: async () => {},
        changes: [],
    },
    views: {},
};

export default overrides;
