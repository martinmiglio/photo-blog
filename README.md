# Bring your own Photo Blog _(BYOPB)_

Host your own simple and elegant platform for sharing and exploring photos.

[![Project Header Image](https://blogdemo.martinmiglio.dev/og?v2)](https://blogdemo.martinmiglio.dev/)

**BYOPB** is designed as a user-friendly web application for showcasing photos and allowing users to explore posts by tags. It offers an intuitive interface displaying photos in a grid format. The application supports user authentication, enabling designated posters to create new posts, while other users can engage by commenting on posts.

## Technologies

The project utilizes a blend of modern technologies for ease of development and deployment:

- A [NextJS](https://nextjs.org/) frontend deployed on [Vercel](https://vercel.com)
- An [CloudFormation](https://aws.amazon.com/cloudformation/) stack for the backend deployed on AWS

## Deployment

To deploy your personalized instance, follow these steps:

1. **Fork Repository**: Fork the repository to your GitHub account.

2. **Configure Project Details**:
   - Change the following details in the code:
     - Edit the blog title, description, author and domain in the `.env` file.
     - Tailwind color theme in `tailwind.config.js`.
     - Default fonts in `/src/styles/fonts.ts`.

3. **Deploy AWS Stack**: Deploy the AWS CloudFormation stack provided in the repository. This will create the necessary infrastructure for the back end. Generate an access key for the user created by the stack. To optionally enable automatic redeployment on stack changes, enable the [GitHub workflow](.github/workflows/aws-deploy.yml.disabled) in the repository.

4. **Set Environment Variables**:
   - In your local environment or on Vercel, set the following environment variables:
        - AWS Variables:
            - `AWS_ACCESS_KEY_ID`: Set to the generated access key.
            - `AWS_SECRET_ACCESS_KEY`: Set to the corresponding secret key.
            - `AWS_REGION`: Set to the region where the stack was deployed.
            - `AWS_RESOURCE_PREFIX`: Set to the stack name.
        - Google OAuth Variables:
            [Configure Google OAuth 2.0 credentials](https://developers.google.com/identity/protocols/oauth2) for authentication, and set the following variables:
            - `GOOGLE_CLIENT_ID`: OAuth credentials for authentication.
            - `GOOGLE_CLIENT_SECRET`: Secret key for OAuth credentials.
        - NextAuth Variables:
            - `NEXTAUTH_SECRET`: Set to a random string.
        - Analytics Variables (Optional):
            - `ANALYTICS_URL`: Set to the URL of your [umami analytics](https://umami.is/) server. (eg. <https://analytics.example.com>)
            - `ANALYTICS_ID`: Set to the ID of your analytics server.

5. **Deploy Frontend**: Deploy the NextJS frontend on Vercel by importing the repository. Set the above environment variables in the Vercel project settings.

6. **Create Admin User**: Create an admin user by navigating to the `/admin` endpoint of your deployed frontend. The first user to sign in will be designated as the admin user and will have the ability to create new posts and manage other users.

---

## License

This project is licensed under the [MIT License](LICENSE).

## Collaboration

We welcome collaboration and contributions to enhance the BYOPB project. Feel free to fork the repository, make improvements, and submit pull requests. Let's make this platform even better together!
