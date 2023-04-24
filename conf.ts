const config = {
    SECRET: process.env.SECRET!,
    DB: process.env.DB!,
    SALT_ROUND: Number(process.env.SALT_ROUND)!,
    PORT: Number(process.env.PORT)!
}

export default config