/*
 * Vencord, a Discord client mod
 * Copyright (c) 2024 Vendicated and contributors
 * SPDX-License-Identifier: GPL-3.0-or-later
 */

import definePlugin from "@utils/types";

function isDev(id) {
    const devs: string[] = ["886685857560539176", "259558259491340288", "1230555039475568640"];
    return devs.includes(id);
}
export default definePlugin({
    name: "VendroidEnhancements",
    description: "Makes Vendroid usable.",
    required: true,
    authors: [{ name: "nina", id: 886685857560539176n }, { name: "sqaa", id: 259558259491340288n }],
    patches: [
        {
            find: "chat input type must be set",
            replacement: [{
                match: /(\i.\i.useSetting\(\))&&!\(0,\i.isAndroidWeb\)\(\)/,
                replace: "$1"
            }]
        }
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
