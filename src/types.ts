export interface Alias {
  alias: string;
  command: string;
  path?: string | undefined;
  description?: string;
}

export interface Data {
  aliases: Map<string, Alias>;
}
