window.page_EventMap = {};
window.page_EventMap["allappholder_eventChain"] = {};
window.page_EventMap["bimagenotify_eventChain"] = {
    "0X508000_recvd": {
        "type": "async",
        "on": "bimagenotify_iimagenotification",
        "event": "showNotification",
        "input": '{}',
        "nextaction": {}
    },
    "0X505000_recvd": {
        "type": "async",
        "on": "bimagenotify_iimagenotification",
        "event": "showNotification",
        "input": '{}',
        "nextaction": {}
    },
    "iimagenotification_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "iimagenotification_gotoPage": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "notifytopage",
        "input": '{}',
        "nextaction": {}
    }
};
window.page_EventMap["caipopupnotify_eventChain"] = {
    "0X503000_recvd": {
        "type": "async",
        "on": "caipopupnotify_ipopuptopcai",
        "event": "update",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "caipopupnotify_popupnotifycai",
            "event": "show",
            "input": '',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "lloadApps",
                "input": '{"applist":"iguess"}',
                "nextaction": {}
            }
        }
    },
    "ipopupapprec_linkapp": {
        "type": "async",
        "on": "caipopupnotify_popupnotifycai",
        "event": "hide",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "summarypage_iappiconholder",
            "event": "notifytopage",
            "input": '{"linktype":"2","url":"iguess"}',
            "nextaction": {}
        }
    },
    "ipopuptopcai_notificationclose": {
        "type": "async",
        "on": "caipopupnotify_popupnotifycai",
        "event": "hide",
        "input": '',
        "nextaction": {}
    },
    "ipopuptopcai_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "ipopupapprec_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "ipopuptopcai_todetail": {
        "type": "async",
        "on": "caipopupnotify_popupnotifycai",
        "event": "hide",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "summarypage_iappiconholder",
            "event": "notifytopage",
            "input": '{"linktype":"2","url":"summarypage"}',
            "nextaction": {}
        }
    }
};
window.page_EventMap["guidepage_eventChain"] = {
    "0X501000_recvd": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_guide",
            "event": "show",
            "input": '',
            "nextaction": {
                "type": "sync",
                "on": "allappholder_appmainholder",
                "event": "changeState",
                "input": '{"cstate":"1"}',
                "nextaction": {}
            }
        }
    }
};
window.page_EventMap["ibuoy_eventChain"] = {
    "activetrafficquery_recvd": {
        "type": "async",
        "on": "summarypage_summaryload",
        "event": "hide",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ibuoy_buoy",
            "event": "show",
            "input": '{}',
            "nextaction": {
                "type": "async",
                "on": "summarypage_summary",
                "event": "update",
                "input": '{}',
                "nextaction": {}
            }
        }
    },
    "passivetrafficquerypserrorevent_recvd": {
        "type": "async",
        "on": "ibuoy_buoy",
        "event": "showerror",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_summaryload",
            "event": "hide",
            "input": '{}',
            "nextaction": {
                "type": "async",
                "on": "summarypage_summary",
                "event": "showerror",
                "input": '{}',
                "nextaction": {}
            }
        }
    },
    "passivetrafficquerycommonerror_recvd": {
        "type": "async",
        "on": "ibuoy_buoy",
        "event": "showerror",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_summaryload",
            "event": "hide",
            "input": '{}',
            "nextaction": {
                "type": "async",
                "on": "summarypage_summary",
                "event": "showerror",
                "input": '{}',
                "nextaction": {}
            }
        }
    },
    "activetrafficquerynodata_recvd": {
        "type": "async",
        "on": "summarypage_summaryload",
        "event": "hide",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_summary",
            "event": "showerror",
            "input": '{"errorcode":"default"}',
            "nextaction": {}
        }
    },
    "activetrafficquerypserrorevent_recvd": {
        "type": "async",
        "on": "summarypage_summaryload",
        "event": "hide",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_summary",
            "event": "showerror",
            "input": '{}',
            "nextaction": {}
        }
    },
    "passivetrafficquery_recvd": {
        "type": "async",
        "on": "ibuoy_buoy",
        "event": "show",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_summary",
            "event": "update",
            "input": '{}',
            "nextaction": {}
        }
    },
    "activetrafficquerycommonerror_recvd": {
        "type": "async",
        "on": "summarypage_summaryload",
        "event": "hide",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_summary",
            "event": "showerror",
            "input": '{}',
            "nextaction": {}
        }
    },
    "passivetrafficquerynodata_recvd": {
        "type": "async",
        "on": "ibuoy_buoy",
        "event": "showerror",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_summaryload",
            "event": "hide",
            "input": '{}',
            "nextaction": {
                "type": "async",
                "on": "summarypage_summary",
                "event": "showerror",
                "input": '{"errorcode":"default"}',
                "nextaction": {}
            }
        }
    },
    "buoy_positionchange": {
        "type": "remote_svc",
        "on": "pos",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "buoy_click": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {
            "type": "sync",
            "on": "allappholder_appmainholder",
            "event": "changeState",
            "input": '{"cstate":"1"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "lloadApps",
                "input": '{"applist":"iactivity"}',
                "nextaction": {}
            }
        }
    },
    "buoy_init": {
        "type": "remote_svc",
        "on": "uidisplaycdr",
        "input": '{"templateId":"' + top.tlbs.templateID + '","sfilter":"displayResult,website,displayType,pageId,templateId,firstAccess","displayResult":"0","website":"' + top.tlbs.referer + '","pageId":"ibuoy","displayType":"1","firstAccess":"' + top.tlbs.firstflag + '"}',
        "shared": false,
        "nextaction": {
            "type": "remote_svc",
            "on": "passivetrafficquery",
            "event": "passivetrafficquery",
            "input": '{}',
            "shared": true,
            "nextaction": {
                "type": "remote_svc",
                "on": "notifications",
                "input": '{"sfilter":"sresptime","sresptime":"' + top.tlbs.sresptime + '"}',
                "shared": false,
                "nextaction": {
                    "type": "sync",
                    "on": "ftsiappholdermasterpage_ftsiappholder",
                    "event": "changeCurrentPageIDB",
                    "input": '{"state":"0","pageid":"summarypage"}',
                    "nextaction": {
                        "type": "async",
                        "on": "ftsiappholdermasterpage_ftsiappholder",
                        "event": "lloadApps",
                        "input": '{"applist":"summarypage,cstore,itaocanresult,iframepage"}',
                        "nextaction": {
                            "type": "remote_svc",
                            "on": "packagestore",
                            "input": '{}',
                            "shared": false,
                            "nextaction": {}
                        }
                    }
                }
            }
        }
    }
};
window.page_EventMap["ipopupfeedback_eventChain"] = {
    "0X900004_recvd": {
        "type": "async",
        "on": "ipopupfeedback_popupfeedback",
        "event": "update",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ipopupfeedback_popupfeedback",
            "event": "show",
            "input": '',
            "nextaction": {}
        }
    },
    "popupfeedback_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '',
        "shared": false,
        "nextaction": {}
    }
};
window.page_EventMap["ipopupimgtext_eventChain"] = {
    "0X512000_recvd": {
        "type": "async",
        "on": "ipopupimgtext_popupimgtext",
        "event": "update",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ipopupimgtext_popupimgtext",
            "event": "show",
            "input": '{}',
            "nextaction": {}
        }
    },
    "0X508000_recvd": {
        "type": "async",
        "on": "ipopupimgtext_popupimgtext",
        "event": "update",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ipopupimgtext_popupimgtext",
            "event": "show",
            "input": '{}',
            "nextaction": {}
        }
    },
    "0X505000_recvd": {
        "type": "async",
        "on": "ipopupimgtext_popupimgtext",
        "event": "update",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ipopupimgtext_popupimgtext",
            "event": "show",
            "input": '{}',
            "nextaction": {}
        }
    },
    "popupimgtext_gotoPage": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "notifytopage",
        "input": '{}',
        "nextaction": {}
    },
    "popupimgtext_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    }
};
window.page_EventMap["ipopupmessage_eventChain"] = {
    "0X505000_recvd": {
        "type": "async",
        "on": "ipopupmessage_popupmessage",
        "event": "update",
        "input": '{}',
        "nextaction": {}
    },
    "0X508000_recvd": {
        "type": "async",
        "on": "ipopupmessage_popupmessage",
        "event": "update",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ipopupmessage_popupmessage",
            "event": "show",
            "input": '{}',
            "nextaction": {}
        }
    },
    "popupmessage_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    }
};
window.page_EventMap["ipopuppage_eventChain"] = {
    "ipopup_applinkclick": {
        "type": "remote_svc",
        "on": "mine",
        "input": '{"startNote":"1","noteNo":"10"}',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1"}',
            "nextaction": {}
        }
    }
};
window.page_EventMap["ipopuppuretext_eventChain"] = {
    "0X503000_recvd": {
        "type": "async",
        "on": "ipopuppuretext_popuppuretext",
        "event": "update",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ipopuppuretext_popuppuretext",
            "event": "show",
            "input": '{}',
            "nextaction": {}
        }
    },
    "popuppuretext_gotoPage": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "notifytopage",
        "input": '{}',
        "nextaction": {}
    },
    "popuppuretext_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    }
};
window.page_EventMap["ipopupsign_eventChain"] = {
    "0X508000_recvd": {
        "type": "async",
        "on": "ipopupsign_popupsign",
        "event": "update",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ipopupsign_popupsign",
            "event": "show",
            "input": '{}',
            "nextaction": {}
        }
    },
    "0X512000_recvd": {
        "type": "async",
        "on": "ipopupsign_popupsign",
        "event": "update",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ipopupsign_popupsign",
            "event": "show",
            "input": '{}',
            "nextaction": {}
        }
    },
    "0X505000_recvd": {
        "type": "async",
        "on": "ipopupsign_popupsign",
        "event": "update",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ipopupsign_popupsign",
            "event": "show",
            "input": '{}',
            "nextaction": {}
        }
    },
    "popupsign_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "popupsign_gotoPage": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "notifytopage",
        "input": '{}',
        "nextaction": {}
    }
};
window.page_EventMap["ipopupsim_eventChain"] = {
    "0X508000_recvd": {
        "type": "async",
        "on": "ipopupsim_popupsim",
        "event": "update",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ipopupsim_popupsim",
            "event": "show",
            "input": '',
            "nextaction": {}
        }
    },
    "popupsim_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "popupsim_gotoPage": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "notifytopage",
        "input": '',
        "nextaction": {}
    }
};
window.page_EventMap["ipopupstorefee_eventChain"] = {
    "0X507000_recvd": {
        "type": "async",
        "on": "ipopupstorefee_ipopuptopstorefee",
        "event": "update",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ipopupstorefee_storefeepkgrec",
            "event": "update",
            "input": '',
            "nextaction": {
                "type": "async",
                "on": "ipopupstorefee_ipopupstorefee",
                "event": "show",
                "input": '',
                "nextaction": {
                    "type": "sync",
                    "on": "ftsiappholdermasterpage_ftsiappholder",
                    "event": "lloadApps",
                    "input": '{"applist":"istorefee,receive"}',
                    "nextaction": {}
                }
            }
        }
    },
    "ipopuptopstorefee_storefee": {
        "type": "async",
        "on": "ipopupstorefee_ipopupstorefee",
        "event": "hide",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "istorefee_storefee",
            "event": "update",
            "input": '',
            "nextaction": {
                "type": "async",
                "on": "istorefee_istorefeetitle",
                "event": "updateTitleText",
                "input": '',
                "nextaction": {
                    "type": "sync",
                    "on": "summarypage_iappiconholder",
                    "event": "notifytopage",
                    "input": '',
                    "nextaction": {}
                }
            }
        }
    },
    "ipopuptopstorefee_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "storefeepkgrec_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "storefeepkgrec_storefee": {
        "type": "async",
        "on": "ipopupstorefee_ipopupstorefee",
        "event": "hide",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "istorefee_storefee",
            "event": "update",
            "input": '',
            "nextaction": {
                "type": "async",
                "on": "istorefee_istorefeetitle",
                "event": "updateTitleText",
                "input": '',
                "nextaction": {
                    "type": "sync",
                    "on": "summarypage_iappiconholder",
                    "event": "notifytopage",
                    "input": '',
                    "nextaction": {}
                }
            }
        }
    },
    "ipopuptopstorefee_notificationclose": {
        "type": "async",
        "on": "ipopupstorefee_ipopupstorefee",
        "event": "hide",
        "input": '',
        "nextaction": {}
    }
};
window.page_EventMap["ipopupwelcome_eventChain"] = {
    "0X501000_recvd": {
        "type": "async",
        "on": "ipopupwelcome_popupwelcome",
        "event": "update",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ipopupwelcome_popupwelcome",
            "event": "show",
            "input": '',
            "nextaction": {}
        }
    },
    "popupwelcome_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '',
        "shared": false,
        "nextaction": {}
    }
};
window.page_EventMap["popupnotify_eventChain"] = {
    "0X502000_recvd": {
        "type": "async",
        "on": "popupnotify_ipopuptop",
        "event": "update",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "popupnotify_notifypkgrec",
            "event": "update",
            "input": '{}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "lloadApps",
                "input": '{"applist":"cstore"}',
                "nextaction": {
                    "type": "async",
                    "on": "popupnotify_popupnotify",
                    "event": "show",
                    "input": '{}',
                    "nextaction": {}
                }
            }
        }
    },
    "0X503000_recvd": {
        "type": "async",
        "on": "popupnotify_ipopuptop",
        "event": "update",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "popupnotify_notifypkgrec",
            "event": "update",
            "input": '{}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "lloadApps",
                "input": '{"applist":"cstore"}',
                "nextaction": {
                    "type": "async",
                    "on": "popupnotify_popupnotify",
                    "event": "show",
                    "input": '{}',
                    "nextaction": {}
                }
            }
        }
    },
    "ipopuptop_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "ipopuptop_notificationclose": {
        "type": "async",
        "on": "popupnotify_popupnotify",
        "event": "hide",
        "input": '{}',
        "nextaction": {}
    },
    "ipopuptop_todetail": {
        "type": "async",
        "on": "popupnotify_popupnotify",
        "event": "hide",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_iappiconholder",
            "event": "notifytopage",
            "input": '{"url":"summarypage","linktype":"2"}',
            "nextaction": {}
        }
    },
    "ipopuptop_gotoPage": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "notifytopage",
        "input": '{}',
        "nextaction": {}
    },
    "notifypkgrec_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "notifypkgrec_click": {
        "type": "async",
        "on": "popupnotify_popupnotify",
        "event": "hide",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_iappiconholder",
            "event": "notifytopage",
            "input": '{"reload":"0","url":"cstore","linktype":"2"}',
            "nextaction": {
                "type": "async",
                "on": "cstore_store",
                "event": "changecurrent",
                "input": '{}',
                "nextaction": {}
            }
        }
    }
};
window.page_EventMap["ftsiappholdermasterpage_eventChain"] = {
    "titlecloseimagetouch_click0": {
        "type": "sync",
        "on": "allappholder_appmainholder",
        "event": "changeState",
        "input": '{"cstate":"0"}',
        "nextaction": {
            "type": "sync",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "writeCPageCloseCDR",
            "input": '',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageIDB",
                "input": '{"state":"0","pageid":"summarypage"}',
                "nextaction": {
                    "type": "async",
                    "on": "ibuoy_buoy",
                    "event": "startAutoStateChangeTimer",
                    "input": '',
                    "nextaction": {}
                }
            }
        }
    },
    "titlebackimagetouch_click1": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "popPage",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_repackholder",
            "event": "show",
            "input": '',
            "nextaction": {
                "type": "async",
                "on": "cstore_store",
                "event": "hideConfirmDialog",
                "input": '{}',
                "nextaction": {}
            }
        }
    },
    "titlebackimagetouch_click0": {
        "type": "async",
        "on": "goldcoin_goldcoinlayout",
        "event": "hideMoney",
        "input": '{}',
        "nextaction": {}
    }
};
window.page_EventMap["cstore_eventChain"] = {
    "cstoreshow_recvd": {
        "type": "remote_svc",
        "on": "packagestore",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "packagestore_recvd": {
        "type": "async",
        "on": "cstore_store",
        "event": "update",
        "input": '',
        "nextaction": {}
    },
    "store_click0": {
        "type": "remote_svc",
        "on": "commonpkgsub",
        "event": "commonpkgsub",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "store_clickTime": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "commonpkgsub_recvd": {
        "type": "async",
        "on": "cstore_store",
        "event": "confirm",
        "input": '',
        "nextaction": {}
    },
    "commonpkgsubcommonerror_recvd": {
        "type": "async",
        "on": "cstore_store",
        "event": "queryerror",
        "input": '',
        "nextaction": {}
    },
    "commonpkgsubpserrorevent_recvd": {
        "type": "async",
        "on": "cstore_store",
        "event": "queryerror",
        "input": '',
        "nextaction": {}
    },
    "store_clickSubmit": {
        "type": "remote_svc",
        "on": "confirmpkgsub",
        "event": "confirmpkgsub",
        "input": '',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "cstore_pkgsubresult",
            "event": "loading",
            "input": '',
            "nextaction": {}
        }
    },
    "confirmpkgsubpserrorevent_recvd": {
        "type": "async",
        "on": "cstore_pkgsubresult",
        "event": "error",
        "input": '',
        "nextaction": {}
    },
    "confirmpkgsubpssuberrorevent_recvd": {
        "type": "async",
        "on": "cstore_pkgsubresult",
        "event": "error",
        "input": '',
        "nextaction": {}
    },
    "confirmpkgsubcommonerror_recvd": {
        "type": "async",
        "on": "cstore_pkgsubresult",
        "event": "error",
        "input": '',
        "nextaction": {}
    },
    "confirmpkgcommonerror_recvd": {
        "type": "async",
        "on": "cstore_pkgsubresult",
        "event": "error",
        "input": '',
        "nextaction": {}
    },
    "confirmpkgsub_recvd": {
        "type": "async",
        "on": "cstore_pkgsubresult",
        "event": "update",
        "input": '',
        "nextaction": {
            "type": "remote_svc",
            "on": "packagestore",
            "input": '',
            "shared": false,
            "nextaction": {
                "type": "async",
                "on": "cstore_store",
                "event": "delaytime",
                "input": '',
                "nextaction": {}
            }
        }
    },
    "pkgsubresult_click0": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_taocandetail",
            "event": "hide",
            "input": '',
            "nextaction": {
                "type": "async",
                "on": "summarypage_detailbtn",
                "event": "changState",
                "input": '',
                "nextaction": {}
            }
        }
    },
    "pkgsubresult_click1": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "popPage",
        "input": '',
        "nextaction": {}
    }
};
window.page_EventMap["goldcoin_eventChain"] = {
    "goldcoinshow_recvd": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "lloadApps",
        "input": '{"applist":"iguess,iappdownload,iminecoin,iframepage,iappsearchpage,iguesspeek"}',
        "nextaction": {
            "type": "remote_svc",
            "on": "querycommpany",
            "event": "querycommpany",
            "input": '{"total": ""}',
            "shared": false,
            "nextaction": {
                "type": "remote_svc",
                "on": "guessagain",
                "input": '',
                "shared": false,
                "nextaction": {}
            }
        }
    },
    "goldcoinlayout_coinbtn2Click": {
        "type": "async",
        "on": "ftsiappholdermasterpage_titlebackimagetouch",
        "event": "changeState",
        "input": '{"cstate":"0"}',
        "nextaction": {}
    },
    "goldcoinlayout_moneyhide": {
        "type": "async",
        "on": "ftsiappholdermasterpage_titlebackimagetouch",
        "event": "changeState",
        "input": '{"cstate":"1"}',
        "nextaction": {}
    },
    "goldcoinlayout_circletxt3Click": {
        "type": "remote_svc",
        "on": "mine",
        "input": '{"startNote":"1","noteNo":"10"}',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"iminecoin"}',
            "nextaction": {}
        }
    },
    "goldcoinlayout_showcb": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "showProgress",
        "input": '',
        "nextaction": {
            "type": "remote_svc",
            "on": "querycommpany",
            "input": '',
            "shared": false,
            "nextaction": {}
        }
    },
    "goldcoinlayout_coinUpdated": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "hideProgress",
        "input": '',
        "nextaction": {}
    },
    "gcapplink_applinkClick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"iguess"}',
        "nextaction": {}
    },
    "querycommpany_recvd": {
        "type": "async",
        "on": "goldcoin_goldcoinlayout",
        "event": "updateCoinsData",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "goldcoin_gmoney",
            "event": "update",
            "input": '',
            "nextaction": {}
        }
    },
    "querycommpanynodata_recvd": {
        "type": "async",
        "on": "goldcoin_goldcoinlayout",
        "event": "error",
        "input": '',
        "nextaction": {}
    },
    "goldcoinlayout_coinbtn1Click": {
        "type": "remote_svc",
        "on": "sign",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "sign_recvd": {
        "type": "async",
        "on": "goldcoin_goldcoinlayout",
        "event": "updateCoinsData2",
        "input": '',
        "nextaction": {}
    },
    "goldcoinlayout_coinIncreased": {
        "type": "async",
        "on": "goldcoin_gmoney",
        "event": "updateCoinsTotal",
        "input": '',
        "nextaction": {}
    },
    "gmoney_coinIncreased": {
        "type": "async",
        "on": "goldcoin_goldcoinlayout",
        "event": "updateCoinsData3",
        "input": '',
        "nextaction": {}
    },
    "gmoney_click": {
        "type": "remote_svc",
        "on": "querycommpany",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "commpany_recvd": {
        "type": "async",
        "on": "goldcoin_gmoney",
        "event": "update",
        "input": '',
        "nextaction": {}
    },
    "gmoney_click0": {
        "type": "remote_svc",
        "on": "sign",
        "event": "signcommpany",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "signcommpanyerrorevent_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "signcommpanycommonerrorevent_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "signcommpany_recvd": {
        "type": "async",
        "on": "goldcoin_gmoney",
        "event": "signData",
        "input": '',
        "nextaction": {}
    },
    "gmoney_init": {
        "type": "remote_svc",
        "on": "querycommpany",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "gmoney_applinkClick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"iguess"}',
        "nextaction": {}
    },
    "gmoney_updaterror": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "itaocanresult_itaocanresulttitle",
            "event": "updateTitleText",
            "input": '{"stitle":"赚流量"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"itaocanresult"}',
                "nextaction": {}
            }
        }
    },
    "gmoney_goFirstPage": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {}
    },
    "goldcoinlayout_goFirstPage": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {}
    },
    "goldcoinlayout_showerror": {
        "type": "sync",
        "on": "goldcoin_gcapplink",
        "event": "hide",
        "input": '',
        "nextaction": {}
    },
    "goldcoinlayout_showsucc": {
        "type": "sync",
        "on": "goldcoin_gcapplink",
        "event": "show",
        "input": '',
        "nextaction": {}
    },
    "gmoney_showerror": {
        "type": "sync",
        "on": "goldcoin_gcapplink",
        "event": "hide",
        "input": '',
        "nextaction": {}
    },
    "gmoney_showsucc": {
        "type": "sync",
        "on": "goldcoin_gcapplink",
        "event": "show",
        "input": '',
        "nextaction": {}
    },
    "gcapplink_appdownClick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"iappdownload"}',
        "nextaction": {}
    },
    "goldcoinlayout_shownotice": {
        "type": "async",
        "on": "ipopuppage_ipopup",
        "event": "show",
        "input": '',
        "nextaction": {}
    }
};
window.page_EventMap["iactivity_eventChain"] = {
    "inforcampaignpssuberrorevent_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "inforcampaignnodata_recvd": {
        "type": "async",
        "on": "iactivity_activity",
        "event": "errorupdate",
        "input": '{}',
        "nextaction": {}
    },
    "iactivityshow_recvd": {
        "type": "remote_svc",
        "on": "informationcampaign",
        "event": "inforcampaign",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "inforcampaigncommonerror_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "inforcampaign_recvd": {
        "type": "async",
        "on": "iactivity_activity",
        "event": "update",
        "input": '{}',
        "nextaction": {}
    },
    "inforcampaignpserrorevent_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "activity_goFirstPage": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {}
    },
    "activity_gotoPage": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "topage",
        "input": '{}',
        "nextaction": {}
    }
};
window.page_EventMap["iappdownload_eventChain"] = {
    "gaingoldcoinchain_recvd": {
        "type": "async",
        "on": "iappdownload_appdownload",
        "event": "gaingoldcoin",
        "input": '{}',
        "nextaction": {}
    },
    "iappdownloadshow_recvd": {
        "type": "remote_svc",
        "on": "querywochain",
        "event": "querywo",
        "input": '{}',
        "shared": false,
        "nextaction": {
            "type": "remote_svc",
            "on": "appquerychain",
            "event": "appquerychain",
            "input": '{}',
            "shared": false,
            "nextaction": {
                "type": "remote_svc",
                "on": "advertismentlocation",
                "event": "appdownadvert",
                "input": '{"adlocation":"3"}',
                "shared": false,
                "nextaction": {}
            }
        }
    },
    "appquerychainnodata_recvd": {
        "type": "async",
        "on": "iappdownload_appdownload",
        "event": "error",
        "input": '{}',
        "nextaction": {}
    },
    "appquerychain_recvd": {
        "type": "async",
        "on": "iappdownload_appdownload",
        "event": "update",
        "input": '{}',
        "nextaction": {}
    },
    "appdownadvert_recvd": {
        "type": "async",
        "on": "iappdownload_imagelistapp",
        "event": "update",
        "input": '{}',
        "nextaction": {}
    },
    "querywo_recvd": {
        "type": "async",
        "on": "iappdownload_appdownload",
        "event": "querywo",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "iappdownload_iappsearch",
            "event": "querywo1",
            "input": '{}',
            "nextaction": {}
        }
    },
    "appdownload_more": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"MORE"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "appdownload_showerror": {
        "type": "sync",
        "on": "iappdownload_imagelistapp",
        "event": "hide",
        "input": '{}',
        "nextaction": {
            "type": "sync",
            "on": "iappdownload_iappsearch",
            "event": "hide",
            "input": '{}',
            "nextaction": {}
        }
    },
    "appdownload_showsucc": {
        "type": "sync",
        "on": "iappdownload_imagelistapp",
        "event": "show",
        "input": '{}',
        "nextaction": {
            "type": "sync",
            "on": "iappdownload_iappsearch",
            "event": "show",
            "input": '{}',
            "nextaction": {}
        }
    },
    "appdownload_gaingoldcoinchain": {
        "type": "remote_svc",
        "on": "gaingoldcoinchain",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "appdownload_goFirstPage": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {}
    },
    "iappsearch_urltranslate": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '{}',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"应用"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "imagelistapp_gotoPage": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "topage",
        "input": '{}',
        "nextaction": {}
    }
};
window.page_EventMap["iframepage_eventChain"] = {};
window.page_EventMap["ifscoupon_eventChain"] = {
    "ifscouponshow_recvd": {
        "type": "remote_svc",
        "on": "usercoupondetails",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "usercoupondetails_recvd": {
        "type": "async",
        "on": "ifscoupon_ifscouponcomp",
        "event": "updateCouponData",
        "input": '',
        "nextaction": {}
    }
};
window.page_EventMap["iguess_eventChain"] = {
    "iguessshow_recvd": {
        "type": "remote_svc",
        "on": "guessagain",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "guess_guessagain": {
        "type": "remote_svc",
        "on": "guessagain",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "guessagain_recvd": {
        "type": "async",
        "on": "iguess_guess",
        "event": "getDataInit",
        "input": '',
        "nextaction": {}
    },
    "guessagainnodata_recvd": {
        "type": "async",
        "on": "iguess_guess",
        "event": "nodatarecvd",
        "input": '',
        "nextaction": {}
    },
    "guess_guesssuc": {
        "type": "remote_svc",
        "on": "guesssuc",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "guesssuc_recvd": {
        "type": "async",
        "on": "iguess_guess",
        "event": "guesssucRet",
        "input": '',
        "nextaction": {}
    },
    "guess_peek": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"iguesspeek"}',
        "nextaction": {}
    },
    "guess_peek2": {
        "type": "async",
        "on": "iguesspeek_guesspeek",
        "event": "getDataInit",
        "input": '',
        "nextaction": {}
    },
    "guess_goFirstPage": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {}
    },
    "guess_updateCoinsTotal": {
        "type": "async",
        "on": "goldcoin_goldcoinlayout",
        "event": "updateCoinsData3",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "goldcoin_gmoney",
            "event": "updateCoinsTotal",
            "input": '',
            "nextaction": {}
        }
    }
};
window.page_EventMap["iguesspeek_eventChain"] = {
    "guesspeek_goback": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "popPage",
        "input": '{}',
        "nextaction": {}
    }
};
window.page_EventMap["imine_eventChain"] = {
    "imineshow_recvd": {
        "type": "remote_svc",
        "on": "mine",
        "input": '{"startNote":"1","noteNo":"10"}',
        "shared": false,
        "nextaction": {}
    },
    "cmine_coinclick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"iminecoin"}',
        "nextaction": {}
    },
    "cmine_mysetclick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"imineset"}',
        "nextaction": {}
    },
    "iminesetshow_recvd": {
        "type": "remote_svc",
        "on": "querysetting",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "mine_recvd": {
        "type": "async",
        "on": "imine_cmine",
        "event": "getDataFromRet",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iminecoin_cminecoin",
            "event": "getDataFromRet",
            "input": '',
            "nextaction": {}
        }
    },
    "cmine_myattendClick": {
        "type": "remote_svc",
        "on": "sign",
        "event": "minesign",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "cmine_rulesClick": {
        "type": "async",
        "on": "ipopuppage_ipopup",
        "event": "show",
        "input": '',
        "nextaction": {}
    },
    "minesign_recvd": {
        "type": "async",
        "on": "imine_cmine",
        "event": "signRet",
        "input": '',
        "nextaction": {}
    },
    "cmine_updateCoinsTotal": {
        "type": "async",
        "on": "imine_cmine",
        "event": "updateCoinsTotal",
        "input": '',
        "nextaction": {}
    },
    "cmine_privilegeclick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"ifscoupon"}',
        "nextaction": {}
    }
};
window.page_EventMap["iminecoin_eventChain"] = {
    "iminecoinshow_recvd": {
        "type": "remote_svc",
        "on": "mine",
        "input": '{"startNote":"1","noteNo":"10"}',
        "shared": false,
        "nextaction": {}
    },
    "cminecoin_goback": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"imine"}',
        "nextaction": {}
    },
    "cminecoin_init": {
        "type": "remote_svc",
        "on": "mine",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "mine_recvd": {
        "type": "async",
        "on": "iminecoin_cminecoin",
        "event": "getDataFromRet",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iminecoin_cminecoin",
            "event": "getDataFromRet",
            "input": '',
            "nextaction": {}
        }
    },
    "cminecoin_sendExchange": {
        "type": "remote_svc",
        "on": "earntrafficexchange",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "earntrafficexchange_recvd": {
        "type": "async",
        "on": "iminecoin_cminecoin",
        "event": "getExchangeRes",
        "input": '',
        "nextaction": {}
    },
    "cminecoin_sendTransfer": {
        "type": "remote_svc",
        "on": "virtualcointransfer",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "virtualcointransfer_recvd": {
        "type": "async",
        "on": "iminecoin_cminecoin",
        "event": "getTransferRes",
        "input": '',
        "nextaction": {
            "type": "remote_svc",
            "on": "querycommpany",
            "event": "querycommpany",
            "input": '{"total": ""}',
            "shared": false,
            "nextaction": {
                "type": "remote_svc",
                "on": "mine",
                "input": '{"startNote":"1","noteNo":"10"}',
                "shared": false,
                "nextaction": {}
            }
        }
    },
    "cminecoin_getTypes": {
        "type": "remote_svc",
        "on": "EarnTrafficComboQuery",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "EarnTrafficComboQuery_recvd": {
        "type": "async",
        "on": "iminecoin_cminecoin",
        "event": "getTypesFunc",
        "input": '',
        "nextaction": {}
    },
    "cminecoin_updateCoinsTotal": {
        "type": "async",
        "on": "goldcoin_goldcoinlayout",
        "event": "updateCoinsData3",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "goldcoin_gmoney",
            "event": "updateCoinsTotal",
            "input": '',
            "nextaction": {}
        }
    }
};
window.page_EventMap["imineset_eventChain"] = {
    "querysetting_recvd": {
        "type": "async",
        "on": "imineset_cmineset",
        "event": "settingrecvd",
        "input": '{}',
        "nextaction": {}
    },
    "toolbarclose_recvd": {
        "type": "async",
        "on": "imineset_cmineset",
        "event": "closeFunc",
        "input": '{}',
        "nextaction": {}
    },
    "userfeedback_recvd": {
        "type": "async",
        "on": "imineset_cmineset",
        "event": "feedFunc",
        "input": '{}',
        "nextaction": {}
    },
    "cmineset_feedsubmit": {
        "type": "remote_svc",
        "on": "userfeedback",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "cmineset_setreturnback1": {
        "type": "remote_svc",
        "on": "setting",
        "input": '{}',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "popPage",
            "input": '{}',
            "nextaction": {}
        }
    },
    "cmineset_closeToolbar": {
        "type": "sync",
        "on": "allappholder_appmainholder",
        "event": "changeState",
        "input": '{"cstate":"0"}',
        "nextaction": {
            "type": "sync",
            "on": "ibuoy_buoy",
            "event": "hide",
            "input": '{}',
            "nextaction": {}
        }
    },
    "cmineset_close": {
        "type": "remote_svc",
        "on": "toolbarclose",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "cmineset_goback": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"imine"}',
        "nextaction": {}
    },
    "cmineset_sendExchange": {
        "type": "remote_svc",
        "on": "guess",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "cmineset_setreturnback": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "popPage",
        "input": '{}',
        "nextaction": {}
    },
    "cmineset_tuiclick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"iminetui"}',
        "nextaction": {}
    }
};
window.page_EventMap["iminetui_eventChain"] = {
    "cminetui_tuisubmit": {
        "type": "remote_svc",
        "on": "userfeedback",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "cminetui_tuisubmitclose": {
        "type": "remote_svc",
        "on": "toolbarclose",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "toolbarclose_recvd": {
        "type": "sync",
        "on": "iminetui_cminetui",
        "event": "getDataFromRet",
        "input": '',
        "nextaction": {}
    },
    "cminetui_tuisuccess": {
        "type": "sync",
        "on": "allappholder_appmainholder",
        "event": "changeState",
        "input": '{"cstate":"0"}',
        "nextaction": {
            "type": "sync",
            "on": "ibuoy_buoy",
            "event": "hide",
            "input": '',
            "nextaction": {}
        }
    }
};
window.page_EventMap["imsgbox_eventChain"] = {
    "imsgboxshow_recvd": {
        "type": "remote_svc",
        "on": "queryMessageList",
        "input": '{"flag":"-1","startNum":"1","number":"10"}',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "summarypage_messagebtn",
            "event": "hidetxt",
            "input": '',
            "nextaction": {}
        }
    },
    "msgbox_queryMessageList": {
        "type": "remote_svc",
        "on": "queryMessageList",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "queryMessageList_recvd": {
        "type": "sync",
        "on": "imsgbox_msgbox",
        "event": "queryMessageListRecvd",
        "input": '',
        "nextaction": {}
    },
    "msgbox_deleteMessageDetail": {
        "type": "remote_svc",
        "on": "deleteMessageDetail",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "msgbox_queryMessageDetail": {
        "type": "remote_svc",
        "on": "queryMessageDetail",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "deleteMessageDetail_recvd": {
        "type": "sync",
        "on": "imsgbox_msgbox",
        "event": "deleteMessageDetailRecvd",
        "input": '',
        "nextaction": {}
    }
};
window.page_EventMap["imy_eventChain"] = {
    "imyshow_recvd": {
        "type": "remote_svc",
        "on": "querymemberinfo",
        "input": '',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "lloadApps",
            "input": '{"applist":"ifscoupon,imineset"}',
            "nextaction": {}
        }
    },
    "querymemberinfo_recvd": {
        "type": "async",
        "on": "imy_cmy",
        "event": "memberinfo",
        "input": '',
        "nextaction": {}
    },
    "cmy_memberclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"会员日"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_backclick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {}
    },
    "cmy_attendclick": {
        "type": "remote_svc",
        "on": "sign",
        "event": "mysign",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "mysign_recvd": {
        "type": "async",
        "on": "imy_cmy",
        "event": "signRet",
        "input": '',
        "nextaction": {}
    },
    "mysigncommonerror_recvd": {
        "type": "async",
        "on": "imy_cmy",
        "event": "error",
        "input": '',
        "nextaction": {}
    },
    "cmy_rulebtnclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"欢乐抽奖"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_successbtnclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"欢乐抽奖"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_flowcurrencyclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"兑换流量币"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_luckdrawclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"欢乐抽奖"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_openredclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"开红包"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_hairredclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"派红包"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_privilegeclick": {
        "type": "remote_svc",
        "on": "usercoupondetails",
        "input": '',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"ifscoupon"}',
            "nextaction": {}
        }
    },
    "cmy_latestactivityclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"最新营销活动"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_oldcustomerpreferencesclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"老客户特惠区"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_growupclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"我的成长"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_taskclick": {
        "type": "async",
        "on": "iframepage_iframeholder",
        "event": "receive",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "iframepage_ifptitle",
            "event": "updateTitleText",
            "input": '{"stitle":"我的任务"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"iframepage"}',
                "nextaction": {}
            }
        }
    },
    "cmy_setclick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"imineset"}',
        "nextaction": {}
    }
};
window.page_EventMap["isitenavigation_eventChain"] = {
    "isitenavigationshow_recvd": {
        "type": "remote_svc",
        "on": "snavigation",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "snavigation_recvd": {
        "type": "async",
        "on": "isitenavigation_csitenavigation",
        "event": "update",
        "input": '',
        "nextaction": {}
    },
    "csitenavigation_goFirstPage": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {}
    },
    "csitenavigation_gotoPage": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "notifytopage",
        "input": '',
        "nextaction": {}
    }
};
window.page_EventMap["ispeedpage_eventChain"] = {
    "ispeedpageshow_recvd": {
        "type": "remote_svc",
        "on": "initspeed",
        "input": '',
        "shared": true,
        "nextaction": {}
    },
    "idashboard_updatesucess": {
        "type": "remote_svc",
        "on": "recordspeed",
        "input": '',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "summarypage_speedbtn",
            "event": "showtxt",
            "input": '',
            "nextaction": {}
        }
    },
    "idashboard_updatefail": {
        "type": "async",
        "on": "summarypage_speedbtn",
        "event": "showtxt",
        "input": '{"text":"测速"}',
        "nextaction": {}
    }
};
window.page_EventMap["istorefee_eventChain"] = {
    "storefee_receive": {
        "type": "async",
        "on": "receive_receiveinfo",
        "event": "update",
        "input": '',
        "nextaction": {
            "type": "sync",
            "on": "allappholder_appmainholder",
            "event": "changeState",
            "input": '{"cstate":"1"}',
            "nextaction": {
                "type": "sync",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"receive"}',
                "nextaction": {}
            }
        }
    }
};
window.page_EventMap["itaocanresult_eventChain"] = {
    "itaocanresulttitle_click0": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "popPage",
        "input": '{}',
        "nextaction": {}
    },
    "itaocanresulttitle_click1": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {}
    },
    "taocanresult_changebackbtn": {
        "type": "async",
        "on": "itaocanresult_itaocanresulttitle",
        "event": "updateState",
        "input": '',
        "nextaction": {}
    },
    "taocanresult_click0": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_taocandetail",
            "event": "hide",
            "input": '',
            "nextaction": {
                "type": "async",
                "on": "summarypage_detailbtn",
                "event": "changState",
                "input": '',
                "nextaction": {}
            }
        }
    },
    "taocanresult_click1": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "popPage",
        "input": '',
        "nextaction": {}
    }
};
window.page_EventMap["npackageactivity_eventChain"] = {
    "npackageactivityshow_recvd": {
        "type": "async",
        "on": "npackageactivity_packageactivity",
        "event": "initPage",
        "input": '',
        "nextaction": {
            "type": "remote_svc",
            "on": "advertismentlocation",
            "input": '{"adlocation":"1"}',
            "shared": false,
            "nextaction": {
                "type": "async",
                "on": "summarypage_summary",
                "event": "changesrc",
                "input": '{"ordersrc":"npackageactivity"}',
                "nextaction": {}
            }
        }
    },
    "imagelist_gotoPage": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "topage",
        "input": '',
        "nextaction": {}
    },
    "packageactivity_init": {
        "type": "remote_svc",
        "on": "packageactivity",
        "event": "packageactivity",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "packageactivity_recvd": {
        "type": "async",
        "on": "npackageactivity_packageactivity",
        "event": "update",
        "input": '',
        "nextaction": {}
    },
    "packageactivitynodata_recvd": {
        "type": "async",
        "on": "npackageactivity_packageactivity",
        "event": "error",
        "input": '',
        "nextaction": {}
    },
    "advertismentlocation_recvd": {
        "type": "async",
        "on": "npackageactivity_imagelist",
        "event": "update",
        "input": '',
        "nextaction": {}
    },
    "packageactivity_click0": {
        "type": "remote_svc",
        "on": "commonpkgsub",
        "event": "pkgactivity",
        "input": '',
        "shared": false,
        "nextaction": {}
    },
    "pkgactivitypserrorevent_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "pkgactivitypssuberrorevent_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "pkgactivitycommonerror_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "pkgactivity_recvd": {
        "type": "async",
        "on": "npackageactivity_packageactivity",
        "event": "getInfo",
        "input": '',
        "nextaction": {}
    },
    "packageactivity_click1": {
        "type": "remote_svc",
        "on": "fjydproductpkg",
        "event": "fjydproductpkg",
        "input": '',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "itaocanresult_itaocanresulttitle",
            "event": "updateTitleText",
            "input": '{"stitle":"套餐活动"}',
            "nextaction": {
                "type": "async",
                "on": "itaocanresult_taocanresult",
                "event": "loading",
                "input": '',
                "nextaction": {
                    "type": "async",
                    "on": "ftsiappholdermasterpage_ftsiappholder",
                    "event": "changeCurrentPageID",
                    "input": '{"state":"1","pageid":"itaocanresult"}',
                    "nextaction": {}
                }
            }
        }
    },
    "fjydproductpkgpserrorevent_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "fjydproductpkgpssuberrorevent_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "fjydproductpkgcommonerror_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "fjydproductpkg_recvd": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "update",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"itaocanresult"}',
            "nextaction": {}
        }
    },
    "packageactivity_updaterror": {
        "type": "async",
        "on": "itaocanresult_taocanresult",
        "event": "error",
        "input": '',
        "nextaction": {
            "type": "async",
            "on": "itaocanresult_itaocanresulttitle",
            "event": "updateTitleText",
            "input": '{"stitle":"套餐活动"}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageID",
                "input": '{"state":"1","pageid":"itaocanresult"}',
                "nextaction": {}
            }
        }
    },
    "packageactivity_goFirstPage": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"0","pageid":"summarypage"}',
        "nextaction": {}
    },
    "packageactivity_showerror": {
        "type": "sync",
        "on": "npackageactivity_imagelist",
        "event": "hide",
        "input": '',
        "nextaction": {}
    },
    "packageactivity_showsucc": {
        "type": "sync",
        "on": "npackageactivity_imagelist",
        "event": "show",
        "input": '',
        "nextaction": {}
    }
};
window.page_EventMap["overbuy_eventChain"] = {
    "packageordered_recvd": {
        "type": "async",
        "on": "overbuy_buyovered",
        "event": "update",
        "input": '',
        "nextaction": {}
    }
};
window.page_EventMap["receive_eventChain"] = {
    "receiveinfo_confirmclick": {
        "type": "remote_svc",
        "on": "offlinepacksubscription",
        "event": "offlinepacksubscription",
        "input": '',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "itaocanresult_itaocanresulttitle",
            "event": "updateTitleText",
            "input": '{"stitle":"确认信息"}',
            "nextaction": {
                "type": "async",
                "on": "itaocanresult_taocanresult",
                "event": "error",
                "input": '{"errorcode":"10"}',
                "nextaction": {
                    "type": "async",
                    "on": "ftsiappholdermasterpage_ftsiappholder",
                    "event": "changeCurrentPageID",
                    "input": '{"state":"1","pageid":"itaocanresult"}',
                    "nextaction": {}
                }
            }
        }
    }
};
window.page_EventMap["summarypage_eventChain"] = {
    "trafficdetailsessionerror_recvd": {
        "type": "async",
        "on": "summarypage_taocandetail",
        "event": "error",
        "input": '{}',
        "nextaction": {}
    },
    "trafficdetailpserrorevent_recvd": {
        "type": "async",
        "on": "summarypage_taocandetail",
        "event": "error",
        "input": '{}',
        "nextaction": {}
    },
    "queryMessageStatus_recvd": {
        "type": "async",
        "on": "summarypage_messagebtn",
        "event": "queryMsgBox",
        "input": '{}',
        "nextaction": {}
    },
    "initspeed_recvd": {
        "type": "async",
        "on": "ispeedpage_idashboard",
        "event": "update",
        "input": '{}',
        "nextaction": {}
    },
    "summarypageshow_recvd": {
        "type": "remote_svc",
        "on": "activetrafficquery",
        "event": "activetrafficquery",
        "input": '{}',
        "shared": false,
        "nextaction": {
            "type": "remote_svc",
            "on": "packagerecommandations",
            "input": '{}',
            "shared": true,
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "lloadApps",
                "input": '{"applist":"itaocanresult"}',
                "nextaction": {}
            }
        }
    },
    "packagerecommandations_recvd": {
        "type": "async",
        "on": "summarypage_repackholder",
        "event": "update",
        "input": '{}',
        "nextaction": {}
    },
    "trafficdetailpssuberrorevent_recvd": {
        "type": "async",
        "on": "summarypage_taocandetail",
        "event": "error",
        "input": '{}',
        "nextaction": {}
    },
    "trafficdetailcommonerror_recvd": {
        "type": "async",
        "on": "summarypage_taocandetail",
        "event": "error",
        "input": '{}',
        "nextaction": {}
    },
    "trafficdetail_recvd": {
        "type": "async",
        "on": "summarypage_taocandetail",
        "event": "update",
        "input": '{}',
        "nextaction": {}
    },
    "taocandetail_linkbuy": {
        "type": "remote_svc",
        "on": "packageordered",
        "input": '{}',
        "shared": false,
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","pageid":"overbuy"}',
            "nextaction": {}
        }
    },
    "guide_messagestatuschange": {
        "type": "remote_svc",
        "on": "messagestatuschange",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "summary_ballclick": {
        "type": "async",
        "on": "summarypage_summaryload",
        "event": "show",
        "input": '{}',
        "nextaction": {
            "type": "remote_svc",
            "on": "activetrafficquery",
            "event": "activetrafficquery",
            "input": '{}',
            "shared": false,
            "nextaction": {}
        }
    },
    "speedbtn_btnclick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"ispeedpage"}',
        "nextaction": {}
    },
    "closebtn_btnclick": {
        "type": "sync",
        "on": "allappholder_appmainholder",
        "event": "changeState",
        "input": '{"cstate":"0"}',
        "nextaction": {
            "type": "sync",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "writeCPageCloseCDR",
            "input": '{}',
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "changeCurrentPageIDB",
                "input": '{"state":"0","pageid":"summarypage"}',
                "nextaction": {
                    "type": "async",
                    "on": "ibuoy_buoy",
                    "event": "startAutoStateChangeTimer",
                    "input": '{}',
                    "nextaction": {}
                }
            }
        }
    },
    "iappiconholder_embedpage": {
        "type": "sync",
        "on": "allappholder_appmainholder",
        "event": "changeState",
        "input": '{"cstate":"1"}',
        "nextaction": {
            "type": "async",
            "on": "iframepage_iframeholder",
            "event": "receive",
            "input": '{}',
            "nextaction": {
                "type": "async",
                "on": "iframepage_ifptitle",
                "event": "updateTitleText",
                "input": '{"stitle":"链接"}',
                "nextaction": {
                    "type": "async",
                    "on": "ftsiappholdermasterpage_ftsiappholder",
                    "event": "changeCurrentPageID",
                    "input": '{"state":"1","pageid":"iframepage"}',
                    "nextaction": {}
                }
            }
        }
    },
    "iappiconholder_clickappbtn": {
        "type": "async",
        "on": "allappholder_appmainholder",
        "event": "changeState",
        "input": '{"cstate":"1"}',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1"}',
            "nextaction": {}
        }
    },
    "iappiconholder_click": {
        "type": "remote_svc",
        "on": "contentnotification",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "iappiconholder_initsummary": {
        "type": "remote_svc",
        "on": "activetrafficquery",
        "event": "activetrafficquery",
        "input": '{}',
        "shared": false,
        "nextaction": {
            "type": "remote_svc",
            "on": "packagerecommandations",
            "input": '{}',
            "shared": true,
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "lloadApps",
                "input": '{"applist":"itaocanresult"}',
                "nextaction": {}
            }
        }
    },
    "repackholder_tostore": {
        "type": "sync",
        "on": "allappholder_appmainholder",
        "event": "changeState",
        "input": '{"cstate":"1"}',
        "nextaction": {
            "type": "async",
            "on": "ftsiappholdermasterpage_ftsiappholder",
            "event": "changeCurrentPageID",
            "input": '{"state":"1","reload":"0","pageid":"cstore"}',
            "nextaction": {
                "type": "async",
                "on": "summarypage_summary",
                "event": "changesrc",
                "input": '{"ordersrc":"packagerecommedation"}',
                "nextaction": {
                    "type": "async",
                    "on": "cstore_store",
                    "event": "changecurrent",
                    "input": '{}',
                    "nextaction": {}
                }
            }
        }
    },
    "repackholder_initfinished": {
        "type": "async",
        "on": "summarypage_iappiconholder",
        "event": "dropdown",
        "input": '{}',
        "nextaction": {}
    },
    "detailbtn_toggle0": {
        "type": "async",
        "on": "summarypage_taocandetail",
        "event": "show",
        "input": '{}',
        "nextaction": {
            "type": "remote_svc",
            "on": "trafficquerydetails",
            "event": "trafficdetail",
            "input": '{}',
            "shared": false,
            "nextaction": {
                "type": "async",
                "on": "ftsiappholdermasterpage_ftsiappholder",
                "event": "lloadApps",
                "input": '{"applist":"overbuy"}',
                "nextaction": {}
            }
        }
    },
    "detailbtn_toggle1": {
        "type": "async",
        "on": "summarypage_taocandetail",
        "event": "hide",
        "input": '{}',
        "nextaction": {}
    },
    "messagebtn_queryMessageStatus": {
        "type": "remote_svc",
        "on": "queryMessageStatus",
        "input": '{}',
        "shared": false,
        "nextaction": {}
    },
    "messagebtn_btnclick": {
        "type": "async",
        "on": "ftsiappholdermasterpage_ftsiappholder",
        "event": "changeCurrentPageID",
        "input": '{"state":"1","pageid":"imsgbox"}',
        "nextaction": {
            "type": "async",
            "on": "summarypage_messagebtn",
            "event": "hidetxt",
            "input": '{}',
            "nextaction": {}
        }
    },
    "messagebtn_init": {
        "type": "async",
        "on": "summarypage_messagebtn",
        "event": "queryMsgBoxTimer",
        "input": '{}',
        "nextaction": {}
    }
};
