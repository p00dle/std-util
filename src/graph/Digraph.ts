export interface EdgeType<N> {
  source: N;
  destination: N;
}

export class Node<I, V = I> {
  private id: I;
  constructor(props: V) {
    this.id = props as unknown as I;
  }
  public getIdentity(): I {
    return this.id;
  }
}

export class Edge<N> implements EdgeType<N> {
  constructor(
    public source: N,
    public destination: N,
  ) {}
}

export class Digraph<N extends Node<NI, NA>, E extends EdgeType<N>, EA = never, NA = string, NI = NA> {
  protected nodeMap = new Map<NI, { node: N; edges: { edge: E; node: NI }[] }>();
  constructor(
    protected nodeFactory: (val: NA) => N = ((val: NA) => new Node<NI, NA>(val) as unknown) as (val: NA) => N,
    protected edgeFactory: ((src: N, dest: N) => E) | ((src: N, dest: N, val: EA) => E) = (src: N, dest: N) =>
      new Edge<N>(src, dest) as unknown as E,
  ) {}

  public addNode(node: NA) {
    const nodeObj = this.nodeFactory(node);
    const nodeId = nodeObj.getIdentity();
    if (this.nodeMap.has(nodeId)) throw new Error(`Duplicate node: ${nodeId}`);
    this.nodeMap.set(nodeId, { node: nodeObj, edges: [] });
  }

  public addEdge(src: NI, dest: NI, val?: EA) {
    const srcNode = this.nodeMap.get(src);
    if (!srcNode) throw new Error(`Unable to find source node: ${src}`);
    const destNode = this.nodeMap.get(dest);
    if (!destNode) throw new Error(`Unable to find destination node: ${src}`);
    const edge = this.edgeFactory(srcNode.node, destNode.node, val as unknown as EA);
    srcNode.edges.push({ edge, node: destNode.node.getIdentity() });
  }

  public addNodes(nodes: NA[]) {
    for (const node of nodes) {
      this.addNode(node);
    }
  }

  public addEdges(edges: { src: NI; dest: NI; val?: EA }[]) {
    for (const edge of edges) {
      this.addEdge(edge.src, edge.dest, edge.val);
    }
  }
}
