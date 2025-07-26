import NextAuth from "next-auth"
import FacebookProvider from "next-auth/providers/facebook"
import LinkedInProvider from "next-auth/providers/linkedin"
// import TikTokProvider from "next-auth/providers/tiktok" // Temporarily disabled

const handler = NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      // Requesting permissions to manage pages and post content
      authorization: {
        params: {
          scope: "email,public_profile,pages_show_list,pages_read_engagement,pages_manage_posts,instagram_basic,instagram_content_publish",
        },
      },
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
    // TikTokProvider({
    //   clientId: process.env.TIKTOK_CLIENT_ID!,
    //   clientSecret: process.env.TIKTOK_CLIENT_SECRET!,
    // }),
  ],
})

export { handler as GET, handler as POST }