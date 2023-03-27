
type UserT = {
 id: string,

}

export const createTokenUser = (user: UserT) => {
 return { id: user.id }
}