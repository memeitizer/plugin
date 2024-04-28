import definePlugin from "@utils/types";

function isDev(id) {
    const devs: string[] = ["886685857560539176", "259558259491340288"];
    return devs.includes(id);
}
export default definePlugin({
    name: "VendroidEnhancements",
    description: "Makes Vendroid usable.",
    required: true,
    authors: [{ name: "nina", id: 886685857560539176n }, { name: "sqaa", id: 259558259491340288n }],
    patches: [
        // Disable DevTools footer button without needing to disable isStaff, by Sqaaakoi
        {
            find: ".DevToolsLayerProvider,",
            replacement: [{
                match: /(\(0,\i\.jsx)\)(\("div",\{className\:\i\.container,children:\(0,\i\.jsx\)\(\i\.Clickable,\{onClick\:\i\.toggleDisplayDevTools)/,
                replace: "$1,()=>null)$2"
            }]
        },
        // Disable legacy chat input, also by sqaaakoi
        {
            find: "chat input type must be set",
            replacement: [{
                match: /(UseLegacyChatInput\.useSetting\(\))&&!\(0\,\i\.isAndroidWeb\)\(\)/,
                replace: "$1"
            }]
        },
        // Fix GIF picker
        {
            find: "Messages.EXPRESSION_PICKER_CATEGORIES_A11Y_LABEL",
            replacement: [{
                match: /\!\i\.isMobile/,
                replace: "true"
            }]
        },
    ],
    async start() {
        const VCMContributorBadge = {
            description: "VendroidEnhanced Contributor",
            image: "https://raw.githubusercontent.com/VendroidEnhanced/UpdateTracker/main/logo.png",
            position: Vencord.Api.Badges.BadgePosition.START,
            props: {
                style: {
                    borderRadius: "50%",
                    transform: "scale(0.9)" // The image is a bit too big compared to default badges
                }
            },
            shouldShow: ({ user }) => isDev(user.id.toString()),
            link: "https://github.com/VendroidEnhanced/Vendroid"
        };
        Vencord.Api.Badges.addBadge(VCMContributorBadge);
    },
});
