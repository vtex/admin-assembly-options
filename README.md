
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


## ✅ Features

- [x] [Listing](#listing)
- [x] [Search](#search)
- [x] [Filter Assembly Option Status](#filters)
- [x] [Create Assembly Option](#creation)
- [x] [Edit Assembly Option](#edition)
- [x] [Delete Assembly Option](#deletion)
- [x] [Error validations](#validation)
- [ ] Search SKUs on Register
- [ ] Search Price Table on Register

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

## 🎥 Demonstration

<details id="listing">
<summary> <strong>Listing</strong> </summary>

![Listing](https://user-images.githubusercontent.com/53904010/164768650-f85f8670-3058-4952-9a8e-af86739dc4f9.gif)
</details>

<details id="search">
<summary> <strong>Search</strong> </summary>

![Search](https://user-images.githubusercontent.com/53904010/164768723-1dc5b5cc-527f-4de0-8a11-91845c8a31bd.gif)
</details>

<details id="filters">
<summary> <strong>Filter Assembly Status</strong> </summary>

![Filter](https://user-images.githubusercontent.com/53904010/164768777-87e44f13-c965-4d1b-9d96-24ee07fa8903.gif)
</details>

<details id="creation">
<summary> <strong>Create Assembly Option</strong> </summary>

![creation](https://user-images.githubusercontent.com/53904010/164765461-c008636a-070a-4077-b921-41db4ea75df0.mov)
</details>

<details id="edition">
<summary> <strong>Edit Assembly Option</strong> </summary>

![Edit](https://user-images.githubusercontent.com/53904010/164768873-553f9a4b-c759-453f-8601-d490aece1155.gif)
</details>

<details id="deletion">
<summary> <strong>Delete Assembly Option</strong> </summary>

![Delete](https://user-images.githubusercontent.com/53904010/164768964-4fb41cc8-4a39-4d5e-bd48-6ee4028d8e07.gif)
</details>

<details id="validation">
<summary> <strong>Error Validations</strong> </summary>

![validation](https://user-images.githubusercontent.com/53904010/164766263-2ac91cfc-3889-4c57-a62a-fb5bc3d2cbe0.mov)
</details>

