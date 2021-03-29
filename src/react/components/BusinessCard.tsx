import React from "react"
import { defineStyles } from "../util"
import assets from "../../assets"

const BusinessCardBack = ({
    email, name, part, role, phone
}: BusinessCardProps) => {
    return (
        <div style={styles.card}>
            <div style={styles.contentContainer}>
                <div>
                    <div style={styles.backName}>
                        <div>{name}</div>
                        {/* <div style={styles.backNameSub}>WE NEED ROMANIZATION HERE</div> */}
                    </div>
                    <div style={styles.backRole}>
                        <div>{part}</div>
                        {role && (
                            <>
                            <div style={styles.backRoleSeperator}>/</div>
                            <div>{role}</div>
                            </>
                        )}
                    </div>
                    <div style={styles.backContact}>
                        <div>{phone.replace("-", ". ")}</div>
                        {email && (
                            <>
                            <div style={styles.backContactSeperator}>|</div>
                            <div>{email}</div>
                            </>
                        )}
                    </div>
                </div>
                <div>
                    <div style={styles.companyName}>
                        <div>(주) 직방</div>
                        <div style={styles.companyNameSeperator}>|</div>
                        <div>ZIGBANG Co., Ltd.</div>
                    </div>
                    <div style={styles.detailedText}>
                        <div>06615 서울특별시 서초구 서초대로 411, 5층 (서초동 GT타워)</div>
                        <div>5F GT Tower, 411, Seocho-daero, Seocho-gu, Seoul, Republic of Korea 06615</div>
                        <div style={styles.companyContact}>
                            <div style={styles.marginRight8}>T. 02. 568. 4909</div>
                            <div style={styles.marginRight8}>F. 02. 568. 4908</div>        
                            <div id="nested">W. company.zigbang.com</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const BusinessCardFront = ({
    email, name, part, role, phone
}: BusinessCardProps) => {
    return (
        <div style={styles.card}>
            <div style={styles.contentContainer}>
                <div style={styles.frontLogoSection}>
                    <img width="73px" src={assets.base64.logo_zigbnag} />
                </div>
                <div style={styles.frontNameSection}>
                    <div style={styles.frontName}>{name}</div>
                    <div style={styles.frontRole}>
                        <div>{part}</div>
                        {role && (
                            <>
                            <div style={styles.frontRoleSeperator}>/</div>
                            <div id="nested">{role}</div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export const BusinessCard = (props: BusinessCardProps) => {
    const {side} = props;
    if (side === "back") return <BusinessCardBack {...props} />
    return <BusinessCardFront {...props} />
}

export interface BusinessCardProps {
    name: string
    email: string
    part: string
    role: string
    phone: string
    side?: "front" | "back"
}

const styles = defineStyles({
    card: {
        width: 440,
        height: 286,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
        fontFamily: "Spoqa Han Sans, sans serif",
    },
    contentContainer: {
        paddingTop: 45,
        paddingBottom: 30,
        paddingLeft: 33,
        paddingRight: 33,
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "space-between",
    },
    frontNameSection: {
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    frontLogoSection: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        marginBottom: 35,
    },
    frontName: {
        fontSize: 21,
        letterSpacing: 4,
        marginBottom: 8,
        fontWeight: 500,
    },
    frontRole: {
        fontWeight: 300,
        fontSize: 13,
        flexDirection: "row",
        display: "flex",
    },
    frontRoleSeperator: {
        marginLeft: 10,
        marginRight: 10,
    },
    backName: {
        fontSize: 20,
        letterSpacing: 5,
        fontWeight: 500,
        marginBottom: 3,
        display: "flex",
        alignItems: "center",
    },
    backNameSub: {
        fontSize: 14,
        letterSpacing: 0,
        marginLeft: 6,
    },
    backRole: {
        fontSize: 13,
        display: "flex",
        flexDirection: "row",
        marginBottom: 10,
        marginTop: 3,
    },
    backRoleSeperator: {
        marginLeft: 7,
        marginRight: 7,
        fontWeight: 400,
    },
    backContact: {
        display: "flex",
        fontSize: 12,
        fontWeight: 300,
    },
    backContactSeperator: {
        marginLeft: 5,
        marginRight: 5,
    },
    companyName: {
        fontSize: 13,
        display: "flex",
        color: "#ff7800",
        marginBottom: 5,
    },
    companyNameSeperator: {
        marginLeft: 5,
        marginRight: 5,
    },
    detailedText: {
        fontSize: 10,
        fontWeight: 300,
    },
    companyContact: {
        fontWeight: 400,
        display: "flex",
        marginTop: 3,
    },
    marginRight8: {
        marginRight: 8
    }
})