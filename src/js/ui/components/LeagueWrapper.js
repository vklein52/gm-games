// @flow

import classNames from "classnames";
import PropTypes from "prop-types";
import * as React from "react";
import { helpers, menuItems } from "../util";

const getText = text => {
    if (text.hasOwnProperty("side")) {
        return text.side;
    }
    return text;
};

const MenuGroup = ({ children }) => (
    <ul className="nav flex-column">{children}</ul>
);

const MenuItem = ({ menuItem, pageID, root = true }) => {
    if (menuItem.type === "link") {
        const item = (
            <li className="nav-item">
                <a
                    className={classNames("nav-link", {
                        active: menuItem.active(pageID),
                    })}
                    href={helpers.leagueUrl(menuItem.path)}
                >
                    {getText(menuItem.text)}
                </a>
            </li>
        );
        return root ? <MenuGroup>{item}</MenuGroup> : item;
    }

    if (menuItem.type === "header") {
        return (
            <>
                <h6 className="sidebar-heading px-3">{menuItem.long}</h6>
                <MenuGroup>
                    {menuItem.children.map((child, i) => (
                        <MenuItem
                            key={i}
                            menuItem={child}
                            pageID={pageID}
                            root={false}
                        />
                    ))}
                </MenuGroup>
            </>
        );
    }

    throw new Error(`Unknown menuItem.type "${menuItem.type}"`);
};

type Props = {
    lid: number | void,
    pageID: string,
};

class SideMenu extends React.Component<Props> {
    shouldComponentUpdate(nextProps) {
        return (
            this.props.pageID !== nextProps.pageID ||
            this.props.lid !== nextProps.lid
        );
    }

    render() {
        const pageID = this.props.pageID;

        return (
            <div className="bg-light sidebar">
                <div className="sidebar-sticky">
                    {menuItems.map((menuItem, i) => (
                        <MenuItem key={i} menuItem={menuItem} pageID={pageID} />
                    ))}
                </div>
            </div>
        );
    }
}

SideMenu.propTypes = {
    lid: PropTypes.number,
    pageID: PropTypes.string.isRequired,
};

const LeagueWrapper = ({
    children,
    lid,
    pageId,
}: {
    children: React.Element<any>,
    lid: number | void,
    pageId: string,
}) => {
    return (
        <div>
            <SideMenu lid={lid} pageID={pageId} />
            <div className="league-content p402_premium" id="screenshot-league">
                {children}
            </div>
        </div>
    );
};

LeagueWrapper.propTypes = {
    children: PropTypes.any.isRequired,
    lid: PropTypes.number,
    pageId: PropTypes.string.isRequired,
};

export default LeagueWrapper;
