class Body {
  enabled: boolean;
  accountExpired: boolean;
  credentialsExpired: boolean;
  accountLocked: boolean;
  userName: string;
  id: number;
}

export class UserAccountRequest {
  public body = new Body();
}
