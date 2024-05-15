// This is an auto-generated file, do not edit manually
import type { RuntimeCompositeDefinition } from '@composedb/types'
export const definition: RuntimeCompositeDefinition = {"models":{"AkashaApp":{"interface":false,"implements":["kjzl6hvfrbw6c7fr4o3k2lunhxlz79hq11pw51vykrcqqfuhgglshm1zzhzfeuh"],"id":"kjzl6hvfrbw6cak65bqli1k6p46w8lxrkm34pnrglr1cmqoaakpk75kohtgmh2f","accountRelation":{"type":"set","fields":["name"]}},"AkashaAppInterface":{"interface":true,"implements":[],"id":"kjzl6hvfrbw6c7fr4o3k2lunhxlz79hq11pw51vykrcqqfuhgglshm1zzhzfeuh","accountRelation":{"type":"none"}},"AkashaAppRelease":{"interface":false,"implements":[],"id":"kjzl6hvfrbw6cb03csk8bxuw50irl6m8e0diylhi6euhs9by3ssazl8x5bxhgzj","accountRelation":{"type":"set","fields":["applicationID","version"]}},"AkashaAppReleaseInterface":{"interface":true,"implements":[],"id":"kjzl6hvfrbw6c8fv1e9sa2nrja8c2vd4mvfz6q4kvhpipn0bcfgui0ugg44clkg","accountRelation":{"type":"none"}},"AkashaAppsStream":{"interface":false,"implements":["kjzl6hvfrbw6ca1jjgdczrh9a0gl0r7ffuwv2vlsr5ebtxadw4qy3bjlyn57e8o"],"id":"kjzl6hvfrbw6c7q06h14e3qhe679eqkmnbwd088lk0aey76t64a7rspigjvrv14","accountRelation":{"type":"set","fields":["applicationID"]}},"AkashaBeam":{"interface":false,"implements":["kjzl6hvfrbw6c8k2bz356p3fd0ziu6rspnnsutg7qz55ufoyc0e9x66rcdfwjqf"],"id":"kjzl6hvfrbw6c7hls3jibc4aj5cr5dksgfc2bclnmvvyhhszm29rlogqc3bctbv","accountRelation":{"type":"list"}},"AkashaBeamInterface":{"interface":true,"implements":[],"id":"kjzl6hvfrbw6c8k2bz356p3fd0ziu6rspnnsutg7qz55ufoyc0e9x66rcdfwjqf","accountRelation":{"type":"none"}},"AkashaBeamStream":{"interface":false,"implements":["kjzl6hvfrbw6ca1jjgdczrh9a0gl0r7ffuwv2vlsr5ebtxadw4qy3bjlyn57e8o"],"id":"kjzl6hvfrbw6c97hoypgaydy95soixfc7awsocagr5j9rsebanl1j0qk7vk9ft4","accountRelation":{"type":"set","fields":["beamID"]}},"AkashaBlockStorage":{"interface":false,"implements":["kjzl6hvfrbw6c9kxv1juz9ekpy6h273j6fwxom6687e7g0vpofqk12ilzi45o20"],"id":"kjzl6hvfrbw6c8mwun8qynd046ab3vww3pyd66jiwfpfpkueo1clfae3ak10ej3","accountRelation":{"type":"set","fields":["blockID"]}},"AkashaContentBlock":{"interface":false,"implements":["kjzl6hvfrbw6c9kxv1juz9ekpy6h273j6fwxom6687e7g0vpofqk12ilzi45o20"],"id":"kjzl6hvfrbw6c669t5y804aia7m188hdnje9ouaphxcyzrgfewj9a1yw92ydje8","accountRelation":{"type":"list"}},"AkashaContentBlockInterface":{"interface":true,"implements":[],"id":"kjzl6hvfrbw6c9kxv1juz9ekpy6h273j6fwxom6687e7g0vpofqk12ilzi45o20","accountRelation":{"type":"none"}},"AkashaContentBlockStream":{"interface":false,"implements":["kjzl6hvfrbw6ca1jjgdczrh9a0gl0r7ffuwv2vlsr5ebtxadw4qy3bjlyn57e8o"],"id":"kjzl6hvfrbw6c9p5l8kliiijiye1zxgyrrgyb24exbcfwo0yt631pjpz0x5l8j1","accountRelation":{"type":"set","fields":["blockID"]}},"AkashaFollow":{"interface":false,"implements":["kjzl6hvfrbw6c5zkc1axt3rzafh5lr20l6pulg15lmqqst7avw0of5t0o0xkd65"],"id":"kjzl6hvfrbw6c7t8zu6fnrp33i8zna079wxhy2zagr2xe8u6gx1oc5far8g7fdz","accountRelation":{"type":"set","fields":["profileID"]}},"AkashaFollowInterface":{"interface":true,"implements":[],"id":"kjzl6hvfrbw6c5zkc1axt3rzafh5lr20l6pulg15lmqqst7avw0of5t0o0xkd65","accountRelation":{"type":"none"}},"AkashaIndexStreamInterface":{"interface":true,"implements":[],"id":"kjzl6hvfrbw6ca1jjgdczrh9a0gl0r7ffuwv2vlsr5ebtxadw4qy3bjlyn57e8o","accountRelation":{"type":"none"}},"AkashaIndexedStream":{"interface":false,"implements":["kjzl6hvfrbw6ca1jjgdczrh9a0gl0r7ffuwv2vlsr5ebtxadw4qy3bjlyn57e8o"],"id":"kjzl6hvfrbw6c5cc8dgwzl2zqq0abaw0tmzn9zs3qkq9tqww4qx6mo2cex7xiwa","accountRelation":{"type":"set","fields":["stream","indexType","indexValue"]}},"AkashaInterestsStream":{"interface":false,"implements":["kjzl6hvfrbw6ca1jjgdczrh9a0gl0r7ffuwv2vlsr5ebtxadw4qy3bjlyn57e8o"],"id":"kjzl6hvfrbw6c5nxw06q6jedzsc0my5e6nxowr28hksttinkow7oz4nip7g5ve3","accountRelation":{"type":"set","fields":["labelType","value"]}},"AkashaProfile":{"interface":false,"implements":["kjzl6hvfrbw6c7e8zsymrt8zzgknfgggfya189775z56hbfq8q640mllkm2d349"],"id":"kjzl6hvfrbw6c79qgkux2s9uwssoxk4mflag8vafz7i7l5vxp2r0vrau3iwxwyb","accountRelation":{"type":"single"}},"AkashaProfileInterests":{"interface":false,"implements":["kjzl6hvfrbw6c5z6ksfy4hrtamlc1iroowmwo8asbw1ugoehtss22wo2vzi0lzv"],"id":"kjzl6hvfrbw6c5hu0rah8q742l78vllwes4pna7ulrk3e4d8gcwai0jox1zy92t","accountRelation":{"type":"single"}},"AkashaProfileInterestsInterface":{"interface":true,"implements":[],"id":"kjzl6hvfrbw6c5z6ksfy4hrtamlc1iroowmwo8asbw1ugoehtss22wo2vzi0lzv","accountRelation":{"type":"none"}},"AkashaProfileInterface":{"interface":true,"implements":[],"id":"kjzl6hvfrbw6c7e8zsymrt8zzgknfgggfya189775z56hbfq8q640mllkm2d349","accountRelation":{"type":"none"}},"AkashaProfileStream":{"interface":false,"implements":["kjzl6hvfrbw6ca1jjgdczrh9a0gl0r7ffuwv2vlsr5ebtxadw4qy3bjlyn57e8o"],"id":"kjzl6hvfrbw6c8dhv8e9l3mc2zhzizandz6y2oppputrmn8sy3iyysqfubxqjgx","accountRelation":{"type":"set","fields":["profileID"]}},"AkashaReflect":{"interface":false,"implements":["kjzl6hvfrbw6cb6do0q0p7cwb8anbac8jbnukswic58p52qb4b03bum1zgypjwa"],"id":"kjzl6hvfrbw6c90ld6a7oako91taszx9vuld1tr33dbq0694zz8x9tgkaby119w","accountRelation":{"type":"list"}},"AkashaReflectInterface":{"interface":true,"implements":[],"id":"kjzl6hvfrbw6cb6do0q0p7cwb8anbac8jbnukswic58p52qb4b03bum1zgypjwa","accountRelation":{"type":"none"}},"AkashaReflectStream":{"interface":false,"implements":["kjzl6hvfrbw6ca1jjgdczrh9a0gl0r7ffuwv2vlsr5ebtxadw4qy3bjlyn57e8o"],"id":"kjzl6hvfrbw6c6oh2foehqvzr2fu14eiwncj0yx7u6dofb2hg91fu96lvhii5zn","accountRelation":{"type":"set","fields":["reflectionID"]}}},"objects":{"AkashaApp":{"meta":{"type":"list","required":false,"immutable":false,"item":{"type":"reference","refType":"object","refName":"AkashaAppProviderValue","required":false,"immutable":false}},"name":{"type":"string","required":true,"immutable":true,"indexed":true},"links":{"type":"list","required":false,"immutable":false,"item":{"type":"reference","refType":"object","refName":"AkashaAppLinkSource","required":false,"immutable":false}},"gallery":{"type":"list","required":false,"immutable":false,"item":{"type":"reference","refType":"object","refName":"AkashaAppImageSource","required":false,"immutable":false}},"license":{"type":"string","required":true,"immutable":true},"keywords":{"type":"list","required":false,"immutable":true,"item":{"type":"string","required":false,"immutable":true}},"createdAt":{"type":"datetime","required":true,"immutable":true,"indexed":true},"logoImage":{"type":"reference","refType":"object","refName":"AkashaAppImageSource","required":false,"immutable":false},"coverImage":{"type":"reference","refType":"object","refName":"AkashaAppImageSource","required":false,"immutable":false},"description":{"type":"string","required":true,"immutable":false},"displayName":{"type":"string","required":true,"immutable":true,"indexed":true},"contributors":{"type":"list","required":false,"immutable":false,"item":{"type":"did","required":false,"immutable":false}},"applicationType":{"type":"reference","refType":"enum","refName":"AkashaAppApplicationType","required":false,"immutable":false,"indexed":true},"author":{"type":"view","viewType":"documentAccount"},"version":{"type":"view","viewType":"documentVersion"},"releases":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c8fv1e9sa2nrja8c2vd4mvfz6q4kvhpipn0bcfgui0ugg44clkg","property":"applicationID"}},"releasesCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c8fv1e9sa2nrja8c2vd4mvfz6q4kvhpipn0bcfgui0ugg44clkg","property":"applicationID"}}},"AkashaAppImageSource":{"src":{"type":"uri","required":true,"immutable":false},"width":{"type":"integer","required":false,"immutable":false},"height":{"type":"integer","required":false,"immutable":false}},"AkashaAppInterface":{"meta":{"type":"list","required":false,"immutable":false,"item":{"type":"reference","refType":"object","refName":"AkashaAppInterfaceProviderValue","required":false,"immutable":false}},"name":{"type":"string","required":true,"immutable":true},"links":{"type":"list","required":false,"immutable":false,"item":{"type":"reference","refType":"object","refName":"AkashaAppInterfaceLinkSource","required":false,"immutable":false}},"gallery":{"type":"list","required":false,"immutable":false,"item":{"type":"reference","refType":"object","refName":"AkashaAppInterfaceImageSource","required":false,"immutable":false}},"license":{"type":"string","required":true,"immutable":true},"keywords":{"type":"list","required":false,"immutable":false,"item":{"type":"string","required":false,"immutable":false}},"createdAt":{"type":"datetime","required":true,"immutable":true},"logoImage":{"type":"reference","refType":"object","refName":"AkashaAppInterfaceImageSource","required":false,"immutable":false},"coverImage":{"type":"reference","refType":"object","refName":"AkashaAppInterfaceImageSource","required":false,"immutable":false},"description":{"type":"string","required":true,"immutable":false},"displayName":{"type":"string","required":true,"immutable":true},"contributors":{"type":"list","required":false,"immutable":false,"item":{"type":"did","required":false,"immutable":false}},"applicationType":{"type":"reference","refType":"enum","refName":"AkashaAppInterfaceApplicationType","required":false,"immutable":false},"author":{"type":"view","viewType":"documentAccount"},"version":{"type":"view","viewType":"documentVersion"}},"AkashaAppInterfaceImageSource":{"src":{"type":"uri","required":true,"immutable":false},"width":{"type":"integer","required":false,"immutable":false},"height":{"type":"integer","required":false,"immutable":false}},"AkashaAppInterfaceLinkSource":{"href":{"type":"uri","required":true,"immutable":false},"label":{"type":"string","required":false,"immutable":false}},"AkashaAppInterfaceProviderValue":{"value":{"type":"string","required":true,"immutable":false},"property":{"type":"string","required":true,"immutable":false},"provider":{"type":"string","required":true,"immutable":false}},"AkashaAppLinkSource":{"href":{"type":"uri","required":true,"immutable":false},"label":{"type":"string","required":false,"immutable":false}},"AkashaAppProviderValue":{"value":{"type":"string","required":true,"immutable":false},"property":{"type":"string","required":true,"immutable":false},"provider":{"type":"string","required":true,"immutable":false}},"AkashaAppRelease":{"source":{"type":"cid","required":true,"immutable":false},"version":{"type":"string","required":true,"immutable":true},"createdAt":{"type":"datetime","required":true,"immutable":false},"applicationID":{"type":"streamid","required":true,"immutable":true},"application":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6cb6pcdpdnrlau2rwz0gs5nddo3e5v578s4wstt2kpybrf11byzc","property":"applicationID"}}},"AkashaAppReleaseInterface":{"meta":{"type":"list","required":false,"immutable":false,"item":{"type":"reference","refType":"object","refName":"AkashaAppReleaseInterfaceProviderValue","required":false,"immutable":false}},"source":{"type":"uri","required":true,"immutable":true},"version":{"type":"string","required":true,"immutable":true},"createdAt":{"type":"datetime","required":true,"immutable":true},"applicationID":{"type":"streamid","required":true,"immutable":false},"application":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c7fr4o3k2lunhxlz79hq11pw51vykrcqqfuhgglshm1zzhzfeuh","property":"applicationID"}}},"AkashaAppReleaseInterfaceProviderValue":{"value":{"type":"string","required":true,"immutable":false},"property":{"type":"string","required":true,"immutable":false},"provider":{"type":"string","required":true,"immutable":false}},"AkashaAppReleaseProviderValue":{"value":{"type":"string","required":true,"immutable":false},"property":{"type":"string","required":true,"immutable":false},"provider":{"type":"string","required":true,"immutable":false}},"AkashaAppsStream":{"active":{"type":"boolean","required":true,"immutable":false,"indexed":true},"status":{"type":"reference","refType":"enum","refName":"AkashaAppsStreamModerationStatus","required":false,"immutable":false,"indexed":true},"createdAt":{"type":"datetime","required":true,"immutable":true,"indexed":true},"moderationID":{"type":"streamid","required":false,"immutable":true,"indexed":true},"applicationID":{"type":"streamid","required":true,"immutable":true,"indexed":true},"moderation":{"type":"view","viewType":"relation","relation":{"source":"document","model":null,"property":"moderationID"}},"application":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c7fr4o3k2lunhxlz79hq11pw51vykrcqqfuhgglshm1zzhzfeuh","property":"applicationID"}}},"AkashaBeam":{"nsfw":{"type":"boolean","required":false,"immutable":false,"indexed":true},"tags":{"type":"list","required":false,"immutable":true,"item":{"type":"reference","refType":"object","refName":"AkashaBeamLabeled","required":false,"immutable":true}},"active":{"type":"boolean","required":true,"immutable":false,"indexed":true},"content":{"type":"list","required":true,"immutable":true,"item":{"type":"reference","refType":"object","refName":"AkashaBeamBlockRecord","required":true,"immutable":true}},"mentions":{"type":"list","required":false,"immutable":true,"item":{"type":"did","required":false,"immutable":true}},"createdAt":{"type":"datetime","required":true,"immutable":true,"indexed":true},"embeddedStream":{"type":"reference","refType":"object","refName":"AkashaBeamEmbeddedType","required":false,"immutable":true},"author":{"type":"view","viewType":"documentAccount"},"version":{"type":"view","viewType":"documentVersion"},"reflections":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6cb6do0q0p7cwb8anbac8jbnukswic58p52qb4b03bum1zgypjwa","property":"beamID"}},"reflectionsCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6cb6do0q0p7cwb8anbac8jbnukswic58p52qb4b03bum1zgypjwa","property":"beamID"}}},"AkashaBeamBlockRecord":{"order":{"type":"integer","required":true,"immutable":false},"blockID":{"type":"streamid","required":true,"immutable":false}},"AkashaBeamEmbeddedType":{"label":{"type":"string","required":true,"immutable":false},"embeddedID":{"type":"streamid","required":true,"immutable":false}},"AkashaBeamInterface":{"nsfw":{"type":"boolean","required":false,"immutable":false},"tags":{"type":"list","required":false,"immutable":false,"item":{"type":"reference","refType":"object","refName":"AkashaBeamInterfaceLabeled","required":false,"immutable":false}},"active":{"type":"boolean","required":true,"immutable":false},"content":{"type":"list","required":true,"immutable":false,"item":{"type":"reference","refType":"object","refName":"AkashaBeamInterfaceBlockRecord","required":true,"immutable":false}},"mentions":{"type":"list","required":false,"immutable":false,"item":{"type":"did","required":false,"immutable":false}},"createdAt":{"type":"datetime","required":true,"immutable":true},"embeddedStream":{"type":"reference","refType":"object","refName":"AkashaBeamInterfaceEmbeddedType","required":false,"immutable":true},"author":{"type":"view","viewType":"documentAccount"},"version":{"type":"view","viewType":"documentVersion"}},"AkashaBeamInterfaceBlockRecord":{"order":{"type":"integer","required":true,"immutable":false},"blockID":{"type":"streamid","required":true,"immutable":false}},"AkashaBeamInterfaceEmbeddedType":{"label":{"type":"string","required":true,"immutable":false},"embeddedID":{"type":"streamid","required":true,"immutable":false}},"AkashaBeamInterfaceLabeled":{"value":{"type":"string","required":true,"immutable":false},"labelType":{"type":"string","required":true,"immutable":false}},"AkashaBeamLabeled":{"value":{"type":"string","required":true,"immutable":false},"labelType":{"type":"string","required":true,"immutable":false}},"AkashaBeamStream":{"active":{"type":"boolean","required":true,"immutable":false,"indexed":true},"beamID":{"type":"streamid","required":true,"immutable":true,"indexed":true},"status":{"type":"reference","refType":"enum","refName":"AkashaBeamStreamModerationStatus","required":false,"immutable":false,"indexed":true},"createdAt":{"type":"datetime","required":true,"immutable":true,"indexed":true},"moderationID":{"type":"streamid","required":false,"immutable":true,"indexed":true},"beam":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c8k2bz356p3fd0ziu6rspnnsutg7qz55ufoyc0e9x66rcdfwjqf","property":"beamID"}},"moderation":{"type":"view","viewType":"relation","relation":{"source":"document","model":null,"property":"moderationID"}}},"AkashaBlockStorage":{"kind":{"type":"reference","refType":"enum","refName":"AkashaBlockStorageBlockDef","required":false,"immutable":false,"indexed":true},"nsfw":{"type":"boolean","required":false,"immutable":true},"active":{"type":"boolean","required":true,"immutable":false,"indexed":true},"blockID":{"type":"streamid","required":true,"immutable":true},"content":{"type":"list","required":true,"immutable":true,"item":{"type":"reference","refType":"object","refName":"AkashaBlockStorageLabeledValue","required":true,"immutable":true}},"createdAt":{"type":"datetime","required":true,"immutable":true,"indexed":true},"appVersionID":{"type":"streamid","required":true,"immutable":true},"block":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c669t5y804aia7m188hdnje9ouaphxcyzrgfewj9a1yw92ydje8","property":"blockID"}},"author":{"type":"view","viewType":"documentAccount"},"version":{"type":"view","viewType":"documentVersion"},"appVersion":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c8fv1e9sa2nrja8c2vd4mvfz6q4kvhpipn0bcfgui0ugg44clkg","property":"appVersionID"}}},"AkashaBlockStorageLabeledValue":{"label":{"type":"string","required":true,"immutable":false},"value":{"type":"string","required":true,"immutable":false},"propertyType":{"type":"string","required":true,"immutable":false}},"AkashaContentBlock":{"kind":{"type":"reference","refType":"enum","refName":"AkashaContentBlockBlockDef","required":false,"immutable":false,"indexed":true},"nsfw":{"type":"boolean","required":false,"immutable":true,"indexed":true},"active":{"type":"boolean","required":true,"immutable":false,"indexed":true},"content":{"type":"list","required":true,"immutable":true,"item":{"type":"reference","refType":"object","refName":"AkashaContentBlockLabeledValue","required":true,"immutable":true}},"createdAt":{"type":"datetime","required":true,"immutable":true,"indexed":true},"appVersionID":{"type":"streamid","required":true,"immutable":true,"indexed":true},"author":{"type":"view","viewType":"documentAccount"},"version":{"type":"view","viewType":"documentVersion"},"appVersion":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c8fv1e9sa2nrja8c2vd4mvfz6q4kvhpipn0bcfgui0ugg44clkg","property":"appVersionID"}}},"AkashaContentBlockInterface":{"kind":{"type":"reference","refType":"enum","refName":"AkashaContentBlockInterfaceBlockDef","required":false,"immutable":false},"nsfw":{"type":"boolean","required":false,"immutable":true},"active":{"type":"boolean","required":true,"immutable":false},"content":{"type":"list","required":true,"immutable":false,"item":{"type":"reference","refType":"object","refName":"AkashaContentBlockInterfaceLabeledValue","required":true,"immutable":false}},"createdAt":{"type":"datetime","required":true,"immutable":true},"appVersionID":{"type":"streamid","required":true,"immutable":true},"author":{"type":"view","viewType":"documentAccount"},"version":{"type":"view","viewType":"documentVersion"},"appVersion":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c8fv1e9sa2nrja8c2vd4mvfz6q4kvhpipn0bcfgui0ugg44clkg","property":"appVersionID"}}},"AkashaContentBlockInterfaceLabeledValue":{"label":{"type":"string","required":true,"immutable":false},"value":{"type":"string","required":true,"immutable":false},"propertyType":{"type":"string","required":true,"immutable":false}},"AkashaContentBlockLabeledValue":{"label":{"type":"string","required":true,"immutable":false},"value":{"type":"string","required":true,"immutable":false},"propertyType":{"type":"string","required":true,"immutable":false}},"AkashaContentBlockStream":{"active":{"type":"boolean","required":true,"immutable":false,"indexed":true},"status":{"type":"reference","refType":"enum","refName":"AkashaContentBlockStreamModerationStatus","required":false,"immutable":false,"indexed":true},"blockID":{"type":"streamid","required":true,"immutable":true,"indexed":true},"createdAt":{"type":"datetime","required":true,"immutable":true,"indexed":true},"moderationID":{"type":"streamid","required":false,"immutable":true,"indexed":true},"block":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c9kxv1juz9ekpy6h273j6fwxom6687e7g0vpofqk12ilzi45o20","property":"blockID"}},"moderation":{"type":"view","viewType":"relation","relation":{"source":"document","model":null,"property":"moderationID"}}},"AkashaFollow":{"profileID":{"type":"streamid","required":true,"immutable":true,"indexed":true},"isFollowing":{"type":"boolean","required":true,"immutable":false,"indexed":true},"did":{"type":"view","viewType":"documentAccount"},"profile":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c7e8zsymrt8zzgknfgggfya189775z56hbfq8q640mllkm2d349","property":"profileID"}}},"AkashaFollowInterface":{"profileID":{"type":"streamid","required":true,"immutable":true},"isFollowing":{"type":"boolean","required":true,"immutable":false},"did":{"type":"view","viewType":"documentAccount"},"profile":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c7e8zsymrt8zzgknfgggfya189775z56hbfq8q640mllkm2d349","property":"profileID"}}},"AkashaIndexStreamInterface":{"active":{"type":"boolean","required":true,"immutable":false},"status":{"type":"reference","refType":"enum","refName":"AkashaIndexStreamInterfaceModerationStatus","required":false,"immutable":false},"createdAt":{"type":"datetime","required":true,"immutable":true},"moderationID":{"type":"streamid","required":false,"immutable":true},"moderation":{"type":"view","viewType":"relation","relation":{"source":"document","model":null,"property":"moderationID"}}},"AkashaIndexedStream":{"active":{"type":"boolean","required":true,"immutable":false,"indexed":true},"status":{"type":"reference","refType":"enum","refName":"AkashaIndexedStreamModerationStatus","required":false,"immutable":false,"indexed":true},"stream":{"type":"streamid","required":true,"immutable":true,"indexed":true},"createdAt":{"type":"datetime","required":true,"immutable":true,"indexed":true},"indexType":{"type":"string","required":true,"immutable":true,"indexed":true},"indexValue":{"type":"string","required":true,"immutable":true,"indexed":true},"streamType":{"type":"reference","refType":"enum","refName":"AkashaIndexedStreamStreamType","required":false,"immutable":false,"indexed":true},"moderationID":{"type":"streamid","required":false,"immutable":true,"indexed":true},"moderation":{"type":"view","viewType":"relation","relation":{"source":"document","model":null,"property":"moderationID"}},"streamView":{"type":"view","viewType":"relation","relation":{"source":"document","model":null,"property":"stream"}}},"AkashaInterestsStream":{"value":{"type":"string","required":true,"immutable":true,"indexed":true},"active":{"type":"boolean","required":true,"immutable":false,"indexed":true},"status":{"type":"reference","refType":"enum","refName":"AkashaInterestsStreamModerationStatus","required":false,"immutable":false,"indexed":true},"createdAt":{"type":"datetime","required":true,"immutable":true,"indexed":true},"labelType":{"type":"string","required":true,"immutable":true,"indexed":true},"moderationID":{"type":"streamid","required":false,"immutable":true,"indexed":true},"moderation":{"type":"view","viewType":"relation","relation":{"source":"document","model":null,"property":"moderationID"}}},"AkashaProfile":{"name":{"type":"string","required":true,"immutable":false,"indexed":true},"nsfw":{"type":"boolean","required":false,"immutable":false,"indexed":true},"links":{"type":"list","required":false,"immutable":false,"item":{"type":"reference","refType":"object","refName":"AkashaProfileLinkSource","required":false,"immutable":false}},"avatar":{"type":"reference","refType":"object","refName":"AkashaProfileImageVersions","required":false,"immutable":false},"createdAt":{"type":"datetime","required":true,"immutable":true,"indexed":true},"background":{"type":"reference","refType":"object","refName":"AkashaProfileImageVersions","required":false,"immutable":false},"description":{"type":"string","required":false,"immutable":false},"did":{"type":"view","viewType":"documentAccount"},"followers":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c5zkc1axt3rzafh5lr20l6pulg15lmqqst7avw0of5t0o0xkd65","property":"profileID"}},"followersCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c5zkc1axt3rzafh5lr20l6pulg15lmqqst7avw0of5t0o0xkd65","property":"profileID"}}},"AkashaProfileImageSource":{"src":{"type":"uri","required":true,"immutable":false},"width":{"type":"integer","required":true,"immutable":false},"height":{"type":"integer","required":true,"immutable":false}},"AkashaProfileImageVersions":{"default":{"type":"reference","refType":"object","refName":"AkashaProfileImageSource","required":true,"immutable":false},"alternatives":{"type":"list","required":false,"immutable":false,"item":{"type":"reference","refType":"object","refName":"AkashaProfileImageSource","required":false,"immutable":false}}},"AkashaProfileInterests":{"topics":{"type":"list","required":true,"immutable":false,"item":{"type":"reference","refType":"object","refName":"AkashaProfileInterestsLabeled","required":true,"immutable":false}},"did":{"type":"view","viewType":"documentAccount"}},"AkashaProfileInterestsInterface":{"topics":{"type":"list","required":true,"immutable":false,"item":{"type":"reference","refType":"object","refName":"AkashaProfileInterestsInterfaceLabeled","required":true,"immutable":false}},"did":{"type":"view","viewType":"documentAccount"}},"AkashaProfileInterestsInterfaceLabeled":{"value":{"type":"string","required":true,"immutable":false},"labelType":{"type":"string","required":true,"immutable":false}},"AkashaProfileInterestsLabeled":{"value":{"type":"string","required":true,"immutable":false},"labelType":{"type":"string","required":true,"immutable":false}},"AkashaProfileInterface":{"name":{"type":"string","required":true,"immutable":false},"nsfw":{"type":"boolean","required":false,"immutable":false},"links":{"type":"list","required":false,"immutable":false,"item":{"type":"reference","refType":"object","refName":"AkashaProfileInterfaceLinkSource","required":false,"immutable":false}},"avatar":{"type":"reference","refType":"object","refName":"AkashaProfileInterfaceImageVersions","required":false,"immutable":false},"createdAt":{"type":"datetime","required":true,"immutable":true},"background":{"type":"reference","refType":"object","refName":"AkashaProfileInterfaceImageVersions","required":false,"immutable":false},"description":{"type":"string","required":false,"immutable":false},"did":{"type":"view","viewType":"documentAccount"}},"AkashaProfileInterfaceImageSource":{"src":{"type":"uri","required":true,"immutable":false},"width":{"type":"integer","required":true,"immutable":false},"height":{"type":"integer","required":true,"immutable":false}},"AkashaProfileInterfaceImageVersions":{"default":{"type":"reference","refType":"object","refName":"AkashaProfileInterfaceImageSource","required":true,"immutable":false},"alternatives":{"type":"list","required":false,"immutable":false,"item":{"type":"reference","refType":"object","refName":"AkashaProfileInterfaceImageSource","required":false,"immutable":false}}},"AkashaProfileInterfaceLinkSource":{"href":{"type":"uri","required":true,"immutable":false},"label":{"type":"string","required":false,"immutable":false}},"AkashaProfileLinkSource":{"href":{"type":"uri","required":true,"immutable":false},"label":{"type":"string","required":false,"immutable":false}},"AkashaProfileStream":{"active":{"type":"boolean","required":true,"immutable":false,"indexed":true},"status":{"type":"reference","refType":"enum","refName":"AkashaProfileStreamModerationStatus","required":false,"immutable":false,"indexed":true},"createdAt":{"type":"datetime","required":true,"immutable":true,"indexed":true},"profileID":{"type":"streamid","required":true,"immutable":true,"indexed":true},"moderationID":{"type":"streamid","required":false,"immutable":true,"indexed":true},"profile":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c7e8zsymrt8zzgknfgggfya189775z56hbfq8q640mllkm2d349","property":"profileID"}},"moderation":{"type":"view","viewType":"relation","relation":{"source":"document","model":null,"property":"moderationID"}}},"AkashaReflect":{"nsfw":{"type":"boolean","required":false,"immutable":false,"indexed":true},"tags":{"type":"list","required":false,"immutable":true,"item":{"type":"string","required":false,"immutable":true}},"active":{"type":"boolean","required":true,"immutable":false,"indexed":true},"beamID":{"type":"streamid","required":true,"immutable":true,"indexed":true},"content":{"type":"list","required":true,"immutable":true,"item":{"type":"reference","refType":"object","refName":"AkashaReflectProviderValue","required":true,"immutable":true}},"isReply":{"type":"boolean","required":false,"immutable":true,"indexed":true},"mentions":{"type":"list","required":false,"immutable":true,"item":{"type":"streamid","required":false,"immutable":true}},"createdAt":{"type":"datetime","required":true,"immutable":true,"indexed":true},"reflection":{"type":"streamid","required":false,"immutable":true,"indexed":true},"beam":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c8k2bz356p3fd0ziu6rspnnsutg7qz55ufoyc0e9x66rcdfwjqf","property":"beamID"}},"author":{"type":"view","viewType":"documentAccount"},"version":{"type":"view","viewType":"documentVersion"},"reflectionView":{"type":"view","viewType":"relation","relation":{"source":"document","model":null,"property":"reflection"}}},"AkashaReflectInterface":{"nsfw":{"type":"boolean","required":false,"immutable":false},"tags":{"type":"list","required":false,"immutable":false,"item":{"type":"string","required":false,"immutable":false}},"active":{"type":"boolean","required":true,"immutable":false},"beamID":{"type":"streamid","required":true,"immutable":true},"content":{"type":"list","required":true,"immutable":false,"item":{"type":"reference","refType":"object","refName":"AkashaReflectInterfaceProviderValue","required":true,"immutable":false}},"isReply":{"type":"boolean","required":false,"immutable":true},"mentions":{"type":"list","required":false,"immutable":false,"item":{"type":"streamid","required":false,"immutable":false}},"createdAt":{"type":"datetime","required":true,"immutable":true},"reflection":{"type":"streamid","required":false,"immutable":true},"beam":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c8k2bz356p3fd0ziu6rspnnsutg7qz55ufoyc0e9x66rcdfwjqf","property":"beamID"}},"author":{"type":"view","viewType":"documentAccount"},"version":{"type":"view","viewType":"documentVersion"},"reflectionView":{"type":"view","viewType":"relation","relation":{"source":"document","model":null,"property":"reflection"}}},"AkashaReflectInterfaceProviderValue":{"label":{"type":"string","required":true,"immutable":false},"value":{"type":"string","required":true,"immutable":false},"propertyType":{"type":"string","required":true,"immutable":false}},"AkashaReflectProviderValue":{"label":{"type":"string","required":true,"immutable":false},"value":{"type":"string","required":true,"immutable":false},"propertyType":{"type":"string","required":true,"immutable":false}},"AkashaReflectStream":{"active":{"type":"boolean","required":true,"immutable":false,"indexed":true},"beamID":{"type":"streamid","required":true,"immutable":false,"indexed":true},"status":{"type":"reference","refType":"enum","refName":"AkashaReflectStreamModerationStatus","required":false,"immutable":false,"indexed":true},"isReply":{"type":"boolean","required":false,"immutable":false,"indexed":true},"replyTo":{"type":"streamid","required":false,"immutable":false,"indexed":true},"createdAt":{"type":"datetime","required":true,"immutable":true,"indexed":true},"moderationID":{"type":"streamid","required":false,"immutable":true,"indexed":true},"reflectionID":{"type":"streamid","required":true,"immutable":true,"indexed":true},"moderation":{"type":"view","viewType":"relation","relation":{"source":"document","model":null,"property":"moderationID"}},"reflection":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6cb6do0q0p7cwb8anbac8jbnukswic58p52qb4b03bum1zgypjwa","property":"reflectionID"}}}},"enums":{"AkashaAppApplicationType":["APP","PLUGIN","WIDGET","OTHER"],"AkashaAppInterfaceApplicationType":["APP","PLUGIN","WIDGET","OTHER"],"AkashaAppsStreamModerationStatus":["REMOVED","IN_REVIEW","SUSPENDED","NSFW","OK","OTHER"],"AkashaBeamStreamModerationStatus":["REMOVED","IN_REVIEW","SUSPENDED","NSFW","OK","OTHER"],"AkashaBlockStorageBlockDef":["TEXT","RTF","FORM","IMAGE","ANIMATED_IMAGE","VIDEO","BOOL","EMOJI","FORM_DATA","OTHER"],"AkashaBlockStorageBlockStorageDef":["TEXT","BOOL","EMOJI","FORM_DATA","OTHER"],"AkashaContentBlockBlockDef":["TEXT","RTF","FORM","IMAGE","ANIMATED_IMAGE","VIDEO","BOOL","EMOJI","FORM_DATA","OTHER"],"AkashaContentBlockInterfaceBlockDef":["TEXT","RTF","FORM","IMAGE","ANIMATED_IMAGE","VIDEO","BOOL","EMOJI","FORM_DATA","OTHER"],"AkashaContentBlockStreamModerationStatus":["REMOVED","IN_REVIEW","SUSPENDED","NSFW","OK","OTHER"],"AkashaIndexStreamInterfaceModerationStatus":["REMOVED","IN_REVIEW","SUSPENDED","NSFW","OK","OTHER"],"AkashaIndexedStreamModerationStatus":["REMOVED","IN_REVIEW","SUSPENDED","NSFW","OK","OTHER"],"AkashaIndexedStreamStreamType":["BEAM","REFLECT","PROFILE","APP","EXTENSION","PLUGIN","WIDGET","OTHER"],"AkashaInterestsStreamModerationStatus":["REMOVED","IN_REVIEW","SUSPENDED","NSFW","OK","OTHER"],"AkashaProfileStreamModerationStatus":["REMOVED","IN_REVIEW","SUSPENDED","NSFW","OK","OTHER"],"AkashaReflectStreamModerationStatus":["REMOVED","IN_REVIEW","SUSPENDED","NSFW","OK","OTHER"]},"accountData":{"akashaApp":{"type":"set","name":"AkashaApp"},"akashaAppInterfaceList":{"type":"connection","name":"AkashaAppInterface"},"akashaAppList":{"type":"connection","name":"AkashaApp"},"akashaAppRelease":{"type":"set","name":"AkashaAppRelease"},"akashaAppReleaseInterfaceList":{"type":"connection","name":"AkashaAppReleaseInterface"},"akashaAppReleaseList":{"type":"connection","name":"AkashaAppRelease"},"akashaAppsStream":{"type":"set","name":"AkashaAppsStream"},"akashaAppsStreamList":{"type":"connection","name":"AkashaAppsStream"},"akashaBeamInterfaceList":{"type":"connection","name":"AkashaBeamInterface"},"akashaBeamList":{"type":"connection","name":"AkashaBeam"},"akashaBeamStream":{"type":"set","name":"AkashaBeamStream"},"akashaBeamStreamList":{"type":"connection","name":"AkashaBeamStream"},"akashaBlockStorage":{"type":"set","name":"AkashaBlockStorage"},"akashaBlockStorageList":{"type":"connection","name":"AkashaBlockStorage"},"akashaContentBlockInterfaceList":{"type":"connection","name":"AkashaContentBlockInterface"},"akashaContentBlockList":{"type":"connection","name":"AkashaContentBlock"},"akashaContentBlockStream":{"type":"set","name":"AkashaContentBlockStream"},"akashaContentBlockStreamList":{"type":"connection","name":"AkashaContentBlockStream"},"akashaFollow":{"type":"set","name":"AkashaFollow"},"akashaFollowInterfaceList":{"type":"connection","name":"AkashaFollowInterface"},"akashaFollowList":{"type":"connection","name":"AkashaFollow"},"akashaIndexStreamInterfaceList":{"type":"connection","name":"AkashaIndexStreamInterface"},"akashaIndexedStream":{"type":"set","name":"AkashaIndexedStream"},"akashaIndexedStreamList":{"type":"connection","name":"AkashaIndexedStream"},"akashaInterestsStream":{"type":"set","name":"AkashaInterestsStream"},"akashaInterestsStreamList":{"type":"connection","name":"AkashaInterestsStream"},"akashaProfile":{"type":"node","name":"AkashaProfile"},"akashaProfileInterests":{"type":"node","name":"AkashaProfileInterests"},"akashaProfileInterestsInterfaceList":{"type":"connection","name":"AkashaProfileInterestsInterface"},"akashaProfileInterfaceList":{"type":"connection","name":"AkashaProfileInterface"},"akashaProfileStream":{"type":"set","name":"AkashaProfileStream"},"akashaProfileStreamList":{"type":"connection","name":"AkashaProfileStream"},"akashaReflectInterfaceList":{"type":"connection","name":"AkashaReflectInterface"},"akashaReflectList":{"type":"connection","name":"AkashaReflect"},"akashaReflectStream":{"type":"set","name":"AkashaReflectStream"},"akashaReflectStreamList":{"type":"connection","name":"AkashaReflectStream"}}}