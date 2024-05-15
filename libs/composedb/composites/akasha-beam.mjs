export default function compose(akashaContentBlockIdInterface){
  return `interface AkashaContentBlockInterface @loadModel(id: "${akashaContentBlockIdInterface}") {
  id: ID!
}


type BlockRecord{
  order: Int! @int(min: 0, max: 10)
  blockID: StreamID! @documentReference(model: "AkashaContentBlockInterface")
  # block: AkashaContentBlockInterface! @relationDocument(property: "blockID")
}

type EmbeddedType{
  label: String! @string(minLength:3, maxLength: 32)
  embeddedID : StreamID! @documentReference(model: "Node")
  # content: Node! @relationDocument(property: "embeddedID")
}

type Labeled{
  labelType: String! @string(maxLength: 30)
  value: String! @string(minLength:2, maxLength: 60)
}

interface AkashaBeamInterface
 @createModel(description: "AKASHA Beam interface") {
    author: DID! @documentAccount
    content: [BlockRecord!]! @list(maxLength: 10) @immutable
    tags: [Labeled] @list(maxLength: 10) @immutable
    mentions: [DID] @list(maxLength: 10) @immutable
    version: CommitID! @documentVersion
    embeddedStream: EmbeddedType @immutable
    active: Boolean!
    createdAt: DateTime! @immutable
    nsfw: Boolean
 }

type AkashaBeam implements AkashaBeamInterface
  @createModel(accountRelation: LIST, description: "AKASHA Beam v0.3")
  @createIndex(fields:[{path:"active"}, {path: "createdAt"}, {path: "nsfw"}]) {
    author: DID! @documentAccount
    content: [BlockRecord!]! @list(maxLength: 10) @immutable
    tags: [Labeled] @list(maxLength: 10) @immutable
    mentions: [DID] @list(maxLength: 10) @immutable
    version: CommitID! @documentVersion
    embeddedStream: EmbeddedType @immutable
    active: Boolean!
    createdAt: DateTime! @immutable
    nsfw: Boolean
}
`
}

