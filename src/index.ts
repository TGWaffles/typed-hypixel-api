import { fetch, Headers, RequestInit } from 'undici'
export * from './responses/index'
import {
	// errors
	InvalidApiKeyResponse,
	MalformedUuidResponse,
	MissingFieldResponse,
	ThrottleResponse,

	// resources
	SkyBlockCollectionsResponse,
	GuildAchievementsResponse,
	SkyBlockElectionResponse,
	VanityCompanionsResponse,
	SkyBlockSkillsResponse,
	SkyBlockItemsResponse,
	SkyBlockBingoResponse,
	AchievementsResponse,
	ChallengesResponse,
	VanityPetsResponse,

	// everything else
	SkyBlockRecentlyEndedAuctionsResponse,
	SkyBlockRequestAuctionResponse,
	SkyBlockActiveAuctionsResponse,
	SkyBlockPlayerBingoResponse,
	CurrentPlayerCountsResponse,
	ApiKeyInformationResponse,
	GamesInformationResponse,
	SkyBlockProfilesResponse,
	SkyBlockProfileResponse,
	PunishmentStatsResponse,
	SkyBlockBazaarResponse,
	RankedSkywarsResponse,
	SkyBlockNewsResponse,
	OnlineStatusResponse,
	LeaderboardsResponse,
	RecentGamesResponse,
	NoBingoDataResponse,
	PlayerDataResponse,
	BoostersResponse,
	FriendsResponse,
	GuildResponse,
	QuestsResponse,
} from './responses/index'
import { mapResponseToV2 } from './responses/skyblock/map_v2'

/** The base url of the Hypixel API with a trailing slash */
const BASE_URL = 'https://api.hypixel.net/'

type Response<
	R,
	H extends Record<string, string | number> = {
		'ratelimit-limit': number
		'ratelimit-remaining': number
		'ratelimit-reset': number
	}
> = { data: R; headers: H }

export interface Requests {
	api: {
		options: {
			key: string
		}
		response: Response<ApiKeyInformationResponse | InvalidApiKeyResponse | ThrottleResponse>
	}
	player: {
		options: {
			uuid: string
			key: string
		}
		response: Response<
			PlayerDataResponse | MissingFieldResponse | InvalidApiKeyResponse | ThrottleResponse
		>
	}
	'resources/skyblock/collections': {
		options: {}
		response: Response<SkyBlockCollectionsResponse>
	}
	'resources/skyblock/skills': {
		options: {}
		response: Response<SkyBlockSkillsResponse>
	}
	'resources/skyblock/items': {
		options: {}
		response: Response<SkyBlockItemsResponse>
	}
	'resources/skyblock/election': {
		options: {}
		response: Response<SkyBlockElectionResponse>
	}
	'resources/skyblock/bingo': {
		options: {}
		response: Response<SkyBlockBingoResponse>
	}
	'resources/games': {
		options: {}
		response: Response<GamesInformationResponse>
	}
	'resources/achievements': {
		options: {}
		response: Response<AchievementsResponse>
	}
	'resources/quests': {
		options: {}
		response: Response<QuestsResponse>
	}
	'resources/challenges': {
		options: {}
		response: Response<ChallengesResponse>
	}
	'resources/guilds/achievements': {
		options: {}
		response: Response<GuildAchievementsResponse>
	}
	'resources/vanity/pets': {
		options: {}
		response: Response<VanityPetsResponse>
	}
	'resources/vanity/companions': {
		options: {}
		response: Response<VanityCompanionsResponse>
	}
	'v2/skyblock/profiles': {
		options: {
			uuid: string
			key: string
		}
		response: Response<
			| SkyBlockProfilesResponse
			| MissingFieldResponse
			| InvalidApiKeyResponse
			| MalformedUuidResponse
			| ThrottleResponse
		>
	}
	'v2/skyblock/profile': {
		options: {
			profile: string
			key: string
		}
		response: Response<
			| SkyBlockProfileResponse
			| MissingFieldResponse
			| InvalidApiKeyResponse
			| MalformedUuidResponse
			| ThrottleResponse
		>
	}
	'skyblock/news': {
		options: {
			key: string
		}
		response: Response<
			SkyBlockNewsResponse | MissingFieldResponse | InvalidApiKeyResponse | ThrottleResponse
		>
	}
	'skyblock/auction': {
		options: {
			key: string
		} & (
			| {
					/** Find auctions created by a specific user. */
					player: string
			  }
			| {
					/** Find an auction by its UUID. */
					uuid: string
			  }
			| {
					/** Find auctions created by members of a Co-op by UUID. */
					profile: string
			  }
		)
		response: Response<
			| SkyBlockRequestAuctionResponse
			| MissingFieldResponse
			| InvalidApiKeyResponse
			| ThrottleResponse
		>
	}
	'skyblock/auctions': {
		options: {
			page?: number
		}
		response: Response<SkyBlockActiveAuctionsResponse | MissingFieldResponse>
	}
	'skyblock/auctions_ended': {
		options: {}
		response: Response<SkyBlockRecentlyEndedAuctionsResponse>
	}
	'skyblock/bazaar': {
		options: {}
		response: Response<SkyBlockBazaarResponse>
	}
	'skyblock/bingo': {
		options: {
			key: string
			uuid: string
		}
		response: Response<
			| SkyBlockPlayerBingoResponse
			| MissingFieldResponse
			| InvalidApiKeyResponse
			| ThrottleResponse
			| NoBingoDataResponse
			| MalformedUuidResponse
		>
	}
	friends: {
		options: {
			uuid: string
			key: string
		}
		response: Response<
			| FriendsResponse
			| MissingFieldResponse
			| InvalidApiKeyResponse
			| MalformedUuidResponse
			| ThrottleResponse
		>
	}
	recentgames: {
		options: {
			uuid: string
			key: string
		}
		response: Response<
			| RecentGamesResponse
			| MissingFieldResponse
			| InvalidApiKeyResponse
			| MalformedUuidResponse
			| ThrottleResponse
		>
	}
	status: {
		options: {
			uuid: string
			key: string
		}
		response: Response<
			| OnlineStatusResponse
			| MissingFieldResponse
			| InvalidApiKeyResponse
			| MalformedUuidResponse
			| ThrottleResponse
		>
	}
	guild: {
		options: {
			key: string
		} & (
			| {
					/** The guild id, determined from the `_id` */
					id: string
			  }
			| {
					/** The display name of the guild */
					name: string
			  }
			| {
					/** The UUID of a player in the guild */
					player: string
			  }
		)
		response: Response<
			| GuildResponse
			| MissingFieldResponse
			| InvalidApiKeyResponse
			| MalformedUuidResponse
			| ThrottleResponse
		>
	}
	'player/ranked/skywars': {
		options: {
			uuid: string
			key: string
		}
		response: Response<
			| RankedSkywarsResponse
			| MissingFieldResponse
			| InvalidApiKeyResponse
			| MalformedUuidResponse
			| ThrottleResponse
		>
	}
	boosters: {
		options: {
			key: string
		}
		response: Response<
			BoostersResponse | MissingFieldResponse | InvalidApiKeyResponse | ThrottleResponse
		>
	}
	counts: {
		options: {
			key: string
		}
		response: Response<
			CurrentPlayerCountsResponse | MissingFieldResponse | InvalidApiKeyResponse | ThrottleResponse
		>
	}
	leaderboards: {
		options: {
			key: string
		}
		response: Response<
			LeaderboardsResponse | MissingFieldResponse | InvalidApiKeyResponse | ThrottleResponse
		>
	}
	punishmentstats: {
		options: {
			key: string
		}
		response: Response<
			PunishmentStatsResponse | MissingFieldResponse | InvalidApiKeyResponse | ThrottleResponse
		>
	}
}

async function fetchJsonWithRetry(url: string, options: RequestInit) {
	let retries = 0
	while (true) {
		try {
			const res = await fetch(url, options)
			const resJson = await res.json()
			// quacks like a Response
			return {
				json: async () => resJson,
				headers: res.headers,
			}
		} catch (e: any) {
			if (e.name === 'AbortError') {
				throw e
			}
			if (retries++ > 3) {
				throw e
			}
			await new Promise(resolve => setTimeout(resolve, 1000))
		}
	}
}

export const request = async <P extends keyof Requests>(
	path: P,
	options: Requests[P]['options'],
	retry?: boolean
): Promise<Requests[P]['response']> => {
	const requestHeaders = new Headers()
	const requestParameters: Record<string, string> = {}

	if (options)
		for (const [optionName, optionValue] of Object.entries(options)) {
			if (optionName === 'key') {
				requestHeaders.set('Api-Key', optionValue)
			} else {
				requestParameters[optionName] = optionValue
			}
		}

	const fetchUrl = `${BASE_URL}${path}?` + new URLSearchParams(requestParameters)
	const res = await (retry ? fetchJsonWithRetry : fetch)(fetchUrl, {
		headers: requestHeaders,
	})
	const data = await res.json()

	if (path.substring(0, 2) === 'v2') {
		mapResponseToV2(path, data)
	}

	const headers: Record<string, string | number> = {}
	for (const [name, value] of res.headers.entries()) {
		try {
			headers[name.toLowerCase()] = parseInt(value)
		} catch {
			headers[name.toLowerCase()] = value
		}
	}

	return {
		data: data as any,
		headers: headers as any,
	}
}
