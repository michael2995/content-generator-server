const {src, dest, series} = require("gulp")

const copyYml = (to: string) => {
    return () => src("src/serverless.yml")
    .pipe(dest(to))
}

const copyEnv = (to: string) => {
    return () => src(".env")
    .pipe(dest(to))
}

const copyPackageToDeploy = (to: string) => {
    return () => src("package.json")
    .pipe(dest(to))
}

exports.default = series(
    copyEnv("dist"),
    copyYml("dist"),
    copyPackageToDeploy("dist"),
)
