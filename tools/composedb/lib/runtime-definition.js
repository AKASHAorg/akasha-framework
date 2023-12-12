// This is an auto-generated file, do not edit manually
export const definition = {"models":{"AkashaAppRelease":{"id":"kjzl6hvfrbw6c9spdxcia2mvnfhkri2uzvnmkrw39srvoc4dx8xl2wkvfavtk7h","accountRelation":{"type":"list"}},"AkashaApp":{"id":"kjzl6hvfrbw6c99kqbzbtrktgontbb48psxsd9xai7og9pyey10sv4c5yqvsjvb","accountRelation":{"type":"list"}},"AkashaBeam":{"id":"kjzl6hvfrbw6c7emv46av2u74x3qgu9i3oywn1w7sg8u6momkyg9atp1k5g0z74","accountRelation":{"type":"list"}},"AkashaReflect":{"id":"kjzl6hvfrbw6caw9cwn1v195fntubx2zsfc2z7xythi538se6szelz2c4z8nm1r","accountRelation":{"type":"list"}},"AkashaContentBlock":{"id":"kjzl6hvfrbw6c5a30ha3yuzt87u4mcna2v5tyjbhfoc22l8yyj91iq03pps7osb","accountRelation":{"type":"list"}},"AkashaProfile":{"id":"kjzl6hvfrbw6c9l8sxje9238fz8hx6u6whu9njmww96wn04c6uj0lillf9jygno","accountRelation":{"type":"single"}},"AkashaBlockStorage":{"id":"kjzl6hvfrbw6c76lkwlo3gusv99hav7ckbcbm6txgf8fmfzbmtl04r4zfj7lj5s","accountRelation":{"type":"list"}},"AkashaFollow":{"id":"kjzl6hvfrbw6cabzd9nz2wlwcfo6yoethcv7gi3n43vo9yof5bl5gb72j6pyb6j","accountRelation":{"type":"list"}},"AkashaProfileInterests":{"id":"kjzl6hvfrbw6c6vy9jjafizy9bf7b7fzs209ydpzydb9ka681j8tflqqz87xnpm","accountRelation":{"type":"single"}},"AkashaBeamStream":{"id":"kjzl6hvfrbw6c6hqyas5osqghkk1j4yad87a05mptrh4g0exge4mcj94q7i8zyb","accountRelation":{"type":"list"}},"AkashaReflectStream":{"id":"kjzl6hvfrbw6c9qrlaeb7rnuhdxntq9cdgy96ib2ojn22pbibx9we6lk3vaew6w","accountRelation":{"type":"list"}},"AkashaContentBlockStream":{"id":"kjzl6hvfrbw6c53l0aw38uqnom7gckdg15c0o6q56kquj9q2tap52kt7lx9xsc2","accountRelation":{"type":"list"}},"AkashaAppsStream":{"id":"kjzl6hvfrbw6c7v5vf6zodezjt4a4i26pijze6660pq1uisxazscuiplii0f53o","accountRelation":{"type":"list"}},"AkashaProfileStream":{"id":"kjzl6hvfrbw6c775w8t59cg4794c7zegh2e6wbestrdtj3dp7tjdp8o7fnzng37","accountRelation":{"type":"list"}},"AkashaInterestsStream":{"id":"kjzl6hvfrbw6c81vduz2waz3mqw43lgiuqdlfnce25i8ykxuc1xt9xiogevyn13","accountRelation":{"type":"list"}}},"objects":{"AkashaAppRelease":{"source":{"type":"cid","required":true},"version":{"type":"string","required":true,"indexed":true},"createdAt":{"type":"datetime","required":true,"indexed":true},"applicationID":{"type":"streamid","required":true,"indexed":true},"application":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c99kqbzbtrktgontbb48psxsd9xai7og9pyey10sv4c5yqvsjvb","property":"applicationID"}}},"AkashaApp":{"name":{"type":"string","required":true,"indexed":true},"licence":{"type":"string","required":true},"keywords":{"type":"list","required":false,"item":{"type":"string","required":false}},"createdAt":{"type":"datetime","required":true,"indexed":true},"description":{"type":"string","required":true},"displayName":{"type":"string","required":true,"indexed":true},"contributors":{"type":"list","required":false,"item":{"type":"did","required":false}},"applicationType":{"type":"reference","refType":"enum","refName":"AkashaAppApplicationType","required":false,"indexed":true},"author":{"type":"view","viewType":"documentAccount"},"version":{"type":"view","viewType":"documentVersion"},"releases":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6c9spdxcia2mvnfhkri2uzvnmkrw39srvoc4dx8xl2wkvfavtk7h","property":"applicationID"}},"releasesCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6c9spdxcia2mvnfhkri2uzvnmkrw39srvoc4dx8xl2wkvfavtk7h","property":"applicationID"}}},"AkashaBeamBlockRecord":{"order":{"type":"integer","required":true},"blockID":{"type":"streamid","required":true}},"AkashaBeamEmbeddedType":{"label":{"type":"string","required":true},"embeddedID":{"type":"streamid","required":true}},"AkashaBeam":{"nsfw":{"type":"boolean","required":false,"indexed":true},"tags":{"type":"list","required":false,"item":{"type":"string","required":false},"indexed":true},"active":{"type":"boolean","required":true,"indexed":true},"content":{"type":"list","required":true,"item":{"type":"reference","refType":"object","refName":"AkashaBeamBlockRecord","required":true}},"mentions":{"type":"list","required":false,"item":{"type":"streamid","required":false},"indexed":true},"createdAt":{"type":"datetime","required":true,"indexed":true},"embeddedBeam":{"type":"reference","refType":"object","refName":"AkashaBeamEmbeddedType","required":false},"author":{"type":"view","viewType":"documentAccount"},"version":{"type":"view","viewType":"documentVersion"},"reflections":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6caw9cwn1v195fntubx2zsfc2z7xythi538se6szelz2c4z8nm1r","property":"beamID"}},"reflectionsCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6caw9cwn1v195fntubx2zsfc2z7xythi538se6szelz2c4z8nm1r","property":"beamID"}}},"AkashaReflectProviderValue":{"label":{"type":"string","required":true},"value":{"type":"string","required":true},"propertyType":{"type":"string","required":true}},"AkashaReflect":{"nsfw":{"type":"boolean","required":false,"indexed":true},"tags":{"type":"list","required":false,"item":{"type":"string","required":false},"indexed":true},"active":{"type":"boolean","required":true,"indexed":true},"beamID":{"type":"streamid","required":true},"content":{"type":"list","required":true,"item":{"type":"reference","refType":"object","refName":"AkashaReflectProviderValue","required":true}},"isReply":{"type":"boolean","required":true,"indexed":true},"mentions":{"type":"list","required":false,"item":{"type":"streamid","required":false},"indexed":true},"createdAt":{"type":"datetime","required":true,"indexed":true},"reflection":{"type":"streamid","required":false,"indexed":true},"beam":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c7emv46av2u74x3qgu9i3oywn1w7sg8u6momkyg9atp1k5g0z74","property":"beamID"}},"author":{"type":"view","viewType":"documentAccount"},"version":{"type":"view","viewType":"documentVersion"}},"AkashaContentBlockLabeledValue":{"label":{"type":"string","required":true},"value":{"type":"string","required":true},"propertyType":{"type":"string","required":true}},"AkashaContentBlock":{"kind":{"type":"reference","refType":"enum","refName":"AkashaContentBlockBlockDef","required":false,"indexed":true},"nsfw":{"type":"boolean","required":false,"indexed":true},"active":{"type":"boolean","required":true,"indexed":true},"content":{"type":"list","required":true,"item":{"type":"reference","refType":"object","refName":"AkashaContentBlockLabeledValue","required":true}},"createdAt":{"type":"datetime","required":true,"indexed":true},"appVersionID":{"type":"streamid","required":true,"indexed":true},"author":{"type":"view","viewType":"documentAccount"},"version":{"type":"view","viewType":"documentVersion"},"appVersion":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c9spdxcia2mvnfhkri2uzvnmkrw39srvoc4dx8xl2wkvfavtk7h","property":"appVersionID"}}},"AkashaProfileLinkSource":{"href":{"type":"uri","required":true},"label":{"type":"string","required":false}},"AkashaProfileImageSource":{"src":{"type":"uri","required":true},"width":{"type":"integer","required":true},"height":{"type":"integer","required":true}},"AkashaProfileImageVersions":{"default":{"type":"reference","refType":"object","refName":"AkashaProfileImageSource","required":true},"alternatives":{"type":"list","required":false,"item":{"type":"reference","refType":"object","refName":"AkashaProfileImageSource","required":false}}},"AkashaProfile":{"name":{"type":"string","required":true,"indexed":true},"nsfw":{"type":"boolean","required":false,"indexed":true},"links":{"type":"list","required":false,"item":{"type":"reference","refType":"object","refName":"AkashaProfileLinkSource","required":false}},"avatar":{"type":"reference","refType":"object","refName":"AkashaProfileImageVersions","required":false},"createdAt":{"type":"datetime","required":true,"indexed":true},"background":{"type":"reference","refType":"object","refName":"AkashaProfileImageVersions","required":false},"description":{"type":"string","required":false},"did":{"type":"view","viewType":"documentAccount"},"followers":{"type":"view","viewType":"relation","relation":{"source":"queryConnection","model":"kjzl6hvfrbw6cabzd9nz2wlwcfo6yoethcv7gi3n43vo9yof5bl5gb72j6pyb6j","property":"profileID"}},"followersCount":{"type":"view","viewType":"relation","relation":{"source":"queryCount","model":"kjzl6hvfrbw6cabzd9nz2wlwcfo6yoethcv7gi3n43vo9yof5bl5gb72j6pyb6j","property":"profileID"}}},"AkashaBlockStorageLabeledValue":{"label":{"type":"string","required":true},"value":{"type":"string","required":true},"propertyType":{"type":"string","required":true}},"AkashaBlockStorage":{"kind":{"type":"reference","refType":"enum","refName":"AkashaBlockStorageBlockStorageDef","required":false,"indexed":true},"active":{"type":"boolean","required":true,"indexed":true},"blockID":{"type":"streamid","required":true},"content":{"type":"list","required":true,"item":{"type":"reference","refType":"object","refName":"AkashaBlockStorageLabeledValue","required":true}},"createdAt":{"type":"datetime","required":true,"indexed":true},"appVersionID":{"type":"streamid","required":true},"block":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c5a30ha3yuzt87u4mcna2v5tyjbhfoc22l8yyj91iq03pps7osb","property":"blockID"}},"author":{"type":"view","viewType":"documentAccount"},"version":{"type":"view","viewType":"documentVersion"},"appVersion":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c9spdxcia2mvnfhkri2uzvnmkrw39srvoc4dx8xl2wkvfavtk7h","property":"appVersionID"}}},"AkashaFollow":{"profileID":{"type":"streamid","required":true,"indexed":true},"isFollowing":{"type":"boolean","required":true,"indexed":true},"did":{"type":"view","viewType":"documentAccount"},"profile":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c9l8sxje9238fz8hx6u6whu9njmww96wn04c6uj0lillf9jygno","property":"profileID"}}},"AkashaProfileInterestsLabeled":{"value":{"type":"string","required":true},"labelType":{"type":"string","required":true}},"AkashaProfileInterests":{"topics":{"type":"list","required":true,"item":{"type":"reference","refType":"object","refName":"AkashaProfileInterestsLabeled","required":true}},"did":{"type":"view","viewType":"documentAccount"}},"AkashaBeamStream":{"active":{"type":"boolean","required":true,"indexed":true},"beamID":{"type":"streamid","required":true,"indexed":true},"status":{"type":"reference","refType":"enum","refName":"AkashaBeamStreamModerationStatus","required":false,"indexed":true},"createdAt":{"type":"datetime","required":true,"indexed":true},"moderationID":{"type":"streamid","required":false,"indexed":true},"beam":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c7emv46av2u74x3qgu9i3oywn1w7sg8u6momkyg9atp1k5g0z74","property":"beamID"}}},"AkashaReflectStream":{"active":{"type":"boolean","required":true,"indexed":true},"beamID":{"type":"streamid","required":true,"indexed":true},"status":{"type":"reference","refType":"enum","refName":"AkashaReflectStreamModerationStatus","required":false,"indexed":true},"createdAt":{"type":"datetime","required":true,"indexed":true},"moderationID":{"type":"streamid","required":false,"indexed":true},"reflectionID":{"type":"streamid","required":true,"indexed":true},"reflection":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6caw9cwn1v195fntubx2zsfc2z7xythi538se6szelz2c4z8nm1r","property":"reflectionID"}}},"AkashaContentBlockStream":{"active":{"type":"boolean","required":true,"indexed":true},"beamID":{"type":"streamid","required":true,"indexed":true},"status":{"type":"reference","refType":"enum","refName":"AkashaContentBlockStreamModerationStatus","required":false,"indexed":true},"blockID":{"type":"streamid","required":true,"indexed":true},"createdAt":{"type":"datetime","required":true,"indexed":true},"moderationID":{"type":"streamid","required":false,"indexed":true},"block":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c5a30ha3yuzt87u4mcna2v5tyjbhfoc22l8yyj91iq03pps7osb","property":"blockID"}}},"AkashaAppsStream":{"active":{"type":"boolean","required":true,"indexed":true},"status":{"type":"reference","refType":"enum","refName":"AkashaAppsStreamModerationStatus","required":false,"indexed":true},"createdAt":{"type":"datetime","required":true,"indexed":true},"moderationID":{"type":"streamid","required":false,"indexed":true},"applicationID":{"type":"streamid","required":true,"indexed":true},"application":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c99kqbzbtrktgontbb48psxsd9xai7og9pyey10sv4c5yqvsjvb","property":"applicationID"}}},"AkashaProfileStream":{"active":{"type":"boolean","required":true,"indexed":true},"status":{"type":"reference","refType":"enum","refName":"AkashaProfileStreamModerationStatus","required":false,"indexed":true},"createdAt":{"type":"datetime","required":true,"indexed":true},"profileID":{"type":"streamid","required":true,"indexed":true},"moderationID":{"type":"streamid","required":false,"indexed":true},"profile":{"type":"view","viewType":"relation","relation":{"source":"document","model":"kjzl6hvfrbw6c9l8sxje9238fz8hx6u6whu9njmww96wn04c6uj0lillf9jygno","property":"profileID"}}},"AkashaInterestsStream":{"value":{"type":"string","required":true,"indexed":true},"active":{"type":"boolean","required":true,"indexed":true},"status":{"type":"reference","refType":"enum","refName":"AkashaInterestsStreamModerationStatus","required":false,"indexed":true},"createdAt":{"type":"datetime","required":true,"indexed":true},"labelType":{"type":"string","required":true,"indexed":true},"moderationID":{"type":"streamid","required":false,"indexed":true}}},"enums":{"AkashaAppApplicationType":["APP","PLUGIN","WIDGET","OTHER"],"AkashaContentBlockBlockDef":["TEXT","FORM","OTHER"],"AkashaBlockStorageBlockStorageDef":["TEXT","BOOL","EMOJI","FORM_DATA","OTHER"],"AkashaBeamStreamModerationStatus":["REMOVED","IN_REVIEW","SUSPENDED","NSFW","OK","OTHER"],"AkashaReflectStreamModerationStatus":["REMOVED","IN_REVIEW","SUSPENDED","NSFW","OK","OTHER"],"AkashaContentBlockStreamModerationStatus":["REMOVED","IN_REVIEW","SUSPENDED","NSFW","OK","OTHER"],"AkashaAppsStreamModerationStatus":["REMOVED","IN_REVIEW","SUSPENDED","NSFW","OK","OTHER"],"AkashaProfileStreamModerationStatus":["REMOVED","IN_REVIEW","SUSPENDED","NSFW","OK","OTHER"],"AkashaInterestsStreamModerationStatus":["REMOVED","IN_REVIEW","SUSPENDED","NSFW","OK","OTHER"]},"accountData":{"akashaAppReleaseList":{"type":"connection","name":"AkashaAppRelease"},"akashaAppList":{"type":"connection","name":"AkashaApp"},"akashaBeamList":{"type":"connection","name":"AkashaBeam"},"akashaReflectList":{"type":"connection","name":"AkashaReflect"},"akashaContentBlockList":{"type":"connection","name":"AkashaContentBlock"},"akashaProfile":{"type":"node","name":"AkashaProfile"},"akashaBlockStorageList":{"type":"connection","name":"AkashaBlockStorage"},"akashaFollowList":{"type":"connection","name":"AkashaFollow"},"akashaProfileInterests":{"type":"node","name":"AkashaProfileInterests"},"akashaBeamStreamList":{"type":"connection","name":"AkashaBeamStream"},"akashaReflectStreamList":{"type":"connection","name":"AkashaReflectStream"},"akashaContentBlockStreamList":{"type":"connection","name":"AkashaContentBlockStream"},"akashaAppsStreamList":{"type":"connection","name":"AkashaAppsStream"},"akashaProfileStreamList":{"type":"connection","name":"AkashaProfileStream"},"akashaInterestsStreamList":{"type":"connection","name":"AkashaInterestsStream"}}}
