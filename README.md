
<img alt="VTEX Admin" src="./assets/vtex-logo.svg" height="100" width="117" />

# Assembly Options (On Progress)

---

VTEX IO based admin app example with the [admin-ui design system](https://admin-ui.vercel.app/).

Live demo on [adminuiexample--teamadmin.myvtex.com/admin/example](https://adminuiexample--teamadmin.myvtex.com/admin/example/)

## Features
- Register Form of a new Assembly Options ans its related SKUs

## Contribute

Feel free to let us know in the [issues](https://github.com/vtex/admin-ui-example/issues) if you would like to see a specific feature.



# Admin Collections

> Currently on BETA :construction:

New admin app for controlling and managing the Assembly Options of a store.

## Installing this app using [VTEX IO CLI](https://github.com/vtex/toolbelt)

The app should already be installed in any new VTEX Store, inside the sidebar menu 'Product" section.
If for some reason the account you are working with does not have this option, you can manually install this by following the steps below:

1. Run `vtex switch <account-name>` to switch to the target account
2. `vtex install vtex.admin-assembly-options@0.x`

If everything went well, you can find the  **Admin > Products > Assembly Options** or acessing the URL `/admin/assembly-options/`:

<div style="text-align:center">
<img src="ADMIN_COLLECTIONS.png" alt="Admin Collections location"/>
</div>

## Main Features

- Create and remove collections
- Add and remove products in a collection
- Change the order of products in a collection
- Search and filter collections and products
- Schedule collections
- Import and export products

## Frequently Asked Questions

<details>
<summary>Why can't I create or edit collections?</summary>

You need to have an [access profile](https://help.vtex.com/en/tutorial/access-profiles--7HKK5Uau2H6wxE1rH5oRbc?locale=en) with the **Writing Collections** resource in **Collections** section on the **Catalog** Profiles.

</details>

<details>
<summary>What are the Collections Types?</summary>

You can see about this [here](https://help.vtex.com/en/tutorial/collection-types--5tKnhh8tMGIrVL7Fqirq7n#).

</details>

## Development

Use **vtex link** to develop locally on your workspace

1. Clone this repository
2. `cd admin-collections/`
3. `vtex link`

#### End-to-end

We use [cypress](https://www.cypress.io/) as our e2e testing tool and you can run them using the command: `yarn test:e2e` or `npm run test:e2e`. The tests run on every push via git-hooks and you can ignore them with the `--no-verify` option (You should avoid this, though).

