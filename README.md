# Camera Quest App

Webapp for the Camera Quest project based on ReactJS

## Getting started

```shell
npm install
npm start
```

## Contributing

If you contribute to this project, please follow those guidelines.

### Formatting

We use [ESLint](https://eslint.org/), [Prettier](https://prettier.io/) and [EditorConfig](https://editorconfig.org) to enforce a consistent coding style. Have a look at the corresponding extensions for your editor. Check the config files for more information.

### Git workflow

**Commit**

When you commit, write it so it describes what the commit do. It should begin with a verb. To make this easy, always think as the followint of the sentence "This commit…".

> Examples: `Add POST User`, `Fix issue #123`, `Update README.md`, …

**Branches**

If you want to work on something new, follow this workflow. Keep the `main` branch clean, so other developer can use it as a stable base to work on.

If you want to work on an issue, please check the **issue workflow** below.

1. **Create a new branch** and follow the naming convention: `<type>/<name>`.<br>
   The "type" can be one of the following: <br>`feat`, `style`, `fix`, `test`, `docs`.
2. **Add your changes** to the branch.<br>
   If you want, you can also pull your branch to the remote repository or change branches to work on something else if: just make sure your work is committed or stashed.
3. When you're done, **switch to the `main` branch and pull** the new changes.
4. **Merge** your branch to `main`, test your code.
5. **Push** the changes.
6. **Delete** the branch from the remote, if you don't need it anymore.

> Example:
>
> 1. `git checkout -b feat/post-user`
> 2. `git commit -a -m "Add POST User"`
> 3. `git checkout main && git pull`
> 4. `git merge feat/post-user`
> 5. `git push`
> 6. `git push origin --delete feat/post-user`

**Issues**

You can create and assign issues to you or another developer. When you want to fix one, you have two option.

1. If it's a quick hotfix, you can handle this with a commit by precising the number of the issue, like this: `Fix #123`.
2. If it's a bigger issue, you can create a branch with the name of the issue in it, like this: `fix/issue-#123`

In all case, make sure to close the issue when you fix it.

# About

## Side documentation

[Locales and languages](./src/locales/README.md)

## Contributors

<a href="https://github.com/space-engineers-comem/camera-quest-app/graphs/contributors">
<img src="https://contrib.rocks/image?repo=space-engineers-comem/camera-quest-app"/>
</a>

## License

[MIT license](LICENSE).

Copyright (c) 2022-present, Space Engineers COMEM
