const config = {
    SECRET: process.env.SECRET!,
    DB: process.env.DB!,
    SALT_ROUND: Number(process.env.SALT_ROUND)!
}

export default config