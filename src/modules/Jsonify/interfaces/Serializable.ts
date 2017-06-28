export interface Serializable {
    type: string;
    serialize(): string;
}