Actions to perform:

-   send webhooks
-   send post request
-   create issue to add automatically
-   list of systems available

fast and simple status page built with Gatsby. Host completely free with Netlify.

## Getting started 💻

This website is built to work best with github pages and netlify.

## Repository setup

1. fork this repository

2. update repository secrets. these secrets will be required in the github action.

    a. REPO_TOKEN : a github auth token to fetch issue list and generate site data

    b. REPO_OWNER : repository owner

    c. REPO : repository name

![Screenshot 1](/assets/site-secrets.png?raw=true "repository secrets")

To test locally, create a `.env` file and add secrets in below format.

```
REPO_TOKEN = xxxxxxxxxxxxxxxxxxxxxxxxxxxx
REPO_OWNER = binodswain
REPO = status-page
```

3. Update site-config according to your requirement.
