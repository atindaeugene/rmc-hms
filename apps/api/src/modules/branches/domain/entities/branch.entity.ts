export type BranchProps = {
  id: string;
  code: string;
  name: string;
  isActive: boolean;
};

export class Branch {
  constructor(private readonly props: BranchProps) {}

  get id(): string { return this.props.id; }
  get code(): string { return this.props.code; }
  get name(): string { return this.props.name; }
  get isActive(): boolean { return this.props.isActive; }

  toJSON(): BranchProps {
    return { ...this.props };
  }
}
