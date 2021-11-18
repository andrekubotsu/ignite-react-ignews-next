import NextAuth from "next-auth"
import Providers from "next-auth/providers"

import { query as q } from "faunadb"
import { fauna } from "../../../services/fauna"

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      scope: 'read:user'
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn(user) {

      const { email } = user

      await fauna.query(
        q.Create(
          q.Collection('users'),
          { data: {email}}
        )
      )
      return true
    },
  }
})