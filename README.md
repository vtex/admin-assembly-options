
<img alt="VTEX Admin" src="./assets/vtex-logo.svg" height="100" width="117" />

# Assembly Options (On Progress)

---

VTEX IO based admin app example with the [admin-ui design system](https://admin-ui.vercel.app/).

Live demo on [adminuiexample--teamadmin.myvtex.com/admin/example](https://adminuiexample--teamadmin.myvtex.com/admin/example/)

## Features
- Register Form of a new Assembly Options ans its related SKUs

## Contribute

Feel free to let us know in the [issues](https://github.com/vtex/admin-ui-example/issues) if you would like to see a specific feature.

New admin app for controlling and managing the Assembly Options of a store.

## Installing this app using [VTEX IO CLI](https://github.com/vtex/toolbelt)

The app should already be installed in any new VTEX Store, inside the sidebar menu 'Product" section.
If for some reason the account you are working with does not have this option, you can manually install this by following the steps below:

1. Run `vtex switch <account-name>` to switch to the target account
2. `vtex install vtex.admin-assembly-options@0.x`

If everything went well, you can find the  **Admin > Products > Assembly Options** or acessing the URL `/admin/assembly-options/`:

<div style="text-align:center">
<img width="284" alt="image" src="https://user-images.githubusercontent.com/53904010/164763210-b1d19376-eac3-48ee-92a1-d495c6365b36.png">
</div>


## Main Features

- Create and remove Assembly Options
- Create Groups inside every Assembly option
- Add SKUs and it's configurations to a specific Assembly Options
- Search and filter Assembly options
- Import and export products

## Structure

The application is composed of 2 main pages: `List` and `Register / Edit`.

### List

- This page shows all existing Assembly Options on the current store.
- Main data of each Assembly Option item is avaiable (ID / Name / Status / Required)
- It's possible to search and filter the listing data
- It's to delete or edit the Assembly Options

### Register / Edit

- This page contains the entire form required to create or update an Assembly Option
- The first step is to add the item its main informations (Name / Required / Active)
- The second step is to add the SKU Groups that will be part of the structure, and its configurations (Group Name/ Minimum Quantity/ Maximum Quantity)
- The third step is to add the desired SKUs on each group accordingly to its rules (SKU ID/ Price Table / Minimum Quantity / Maximum Quantity / Default Quantity )
- The screen have validations to prevent user errors on filling the form
- There is a button to save the data added into the Form


## Development

Use **vtex link** to develop locally on your workspace

1. Clone this repository
2. `cd admin-collections/`
3. `vtex link`

#### End-to-end

We use [cypress](https://www.cypress.io/) as our e2e testing tool and you can run them using the command: `yarn test:e2e` or `npm run test:e2e`. The tests run on every push via git-hooks and you can ignore them with the `--no-verify` option (You should avoid this, though).

