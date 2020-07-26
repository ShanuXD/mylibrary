const rootStyles = window.getComputedStyle(document.documentElement);

if (rootStyles.getPropertyValue('--book-cover-width-large') != null && rootStyles.getPropertyValue('--book-cover-width-large') != '') {
    ready()
} else {
    document.getElementById('main-css').addEventListener('load', ready)
}


function ready() {
    const coverWidth = parseFloat(rootStyles.getPropertyValue('--book-cover-width-large'))
    const coverAspecRatio = parseFloat(rootStyles.getPropertyValue('--book-cover-aspect-ratio'))
    const coverHeight = coverWidth / coverAspecRatio

    FilePond.registerPlugin(
        FilePondPluginImagePreview,
        FilePondPluginImageResize,
        FilePondPluginFileEncode,
    )
    FilePond.setOptions({
        stylePanelAspectRatio: 1 / coverAspecRatio,
        imageResizeTargetWidth: coverWidth,
        imageResizeTargetHeight: coverHeight

    })

    FilePond.parse(document.body)
}