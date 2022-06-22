# Assembly Options app

> ⚠ This app is available only for stores developed in [VTEX IO](https://vtex.com/br-pt/store-framework/).

At VTEX, [Assembly Options](https://help.vtex.com/en/tutorial/assembly-options--5x5FhNr4f5RUGDEGWzV1nH) consist on creating [attachments](https://help.vtex.com/en/tutorial/what-is-an-attachment--aGICk0RVbqKg6GYmQcWUm) for complex scenarios, where it is necessary to offer various combinations of SKUs, quantities, additional items and costs.


The **Assembly Options** app provides an interface on VTEX Admin to create and manage product customization options available to customers in a specific store.  This experience aims to offer a simple and easy-to-use alternative to the [manual configuration](https://help.vtex.com/en/tutorial/assembly-options--5x5FhNr4f5RUGDEGWzV1nH#attachments) available through **Catalog > Attachments** using a certain attachment syntax.



## Before you start

To use Assembly Options, you must first install and configure [Product Customizer](https://developers.vtex.com/vtex-developer-docs/docs/vtex-product-customizer) in your store.

We also recommend reading our [Assembly Options](https://help.vtex.com/en/tutorial/assembly-options--5x5FhNr4f5RUGDEGWzV1nH) documentation for more information on this feature.


## Installation

> ⚠ When this app is installed in a [seller account](https://help.vtex.com/en/tutorial/what-is-a-seller--5FkLvhZ3Few4CWWIuYOK2w), the Assembly Option is displayed at checkout. To display it on the product page, you must install the app in a [marketplace account](https://help.vtex.com/tutorial/what-is-a-marketplace--680lLJTnmEAmekcC0MIea8#).

You can install the app for free in the [VTEX App Store](https://apps.vtex.com/vtex-admin-assembly-options/p) or using the [VTEX IO CLI](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-vtex-io-cli-installation-and-command-reference), by running vtex install `vtexbr.admin-assembly-options@0.x` in your terminal.


After the installation, you can find the app's interface on VTEX Admin, by accessing *Products > Assembly options* or  by going directly to the URL `{accountName}.myvtex.com/admin/assembly-options/`, replacing `{accountName}` with your VTEX account.

This app installs Assembly Options GraphQL as a dependency. Learn more about it by accessing the [assembly-options-graphql](https://github.com/vtex/assembly-options-graphql) repository.


    
## How the app works

The app inserts a new menu in the VTEX Admin, which you can access on _Products > Assembly options_.

![](https://i.imgur.com/os1XQBi.png)

The Assembly Options interface allows you to:

- View a searchable and filterable list of existing Assembly Options.
- Edit Assembly Options.
- Create Assembly Options.
- Delete Assembly Options.

For more information on how to use this interface, read our user guide [Assembly Options app](https://help.vtex.com/en/tutorial/assembly-options-app--54mWg37mojrqOgCA79iqqk).