export type Lang = "en" | "zh";

export interface Dict {
  lang: Lang;
  /** Used by route helpers — `/` for en, `/zh` for zh */
  prefix: string;

  nav: {
    ventures: string;
    about: string;
    contact: string;
    switchTo: string;
  };

  home: {
    eyebrow: string;
    titleA: string;
    titleB: string;
    description: string;
    viewVentures: string;
    aboutLink: string;
    indexLabel: string;
    indexValue: string;
    coordinatesLabel: string;
    locationLabel: string;
    ventures: {
      index: string;
      label: string;
      title: string;
      description: string;
    };
    cta: {
      index: string;
      label: string;
      title: string;
      description: string;
      button: string;
    };
  };

  about: {
    metaTitle: string;
    metaDescription: string;
    section: string;
    titleA: string;
    titleB: string;
    mandateLabel: string;
    mandateBody: string[];
    founderLabel: string;
    founderName: string;
    founderBio: string[];
    founderPortraitCaption: string;
    recordLabel: string;
    record: {
      founder: { term: string; value: string };
      jurisdiction: { term: string; value: string };
      registeredAgent: { term: string; value: string };
      established: { term: string; value: string };
      hq: { term: string; value: string };
      domain: { term: string; value: string };
    };
    structureLabel: string;
    structureBody: string[];
  };

  ventures: {
    metaTitle: string;
    metaDescription: string;
    section: string;
    titleA: string;
    titleB: string;
    description: string;
    readCaseStudy: string;
    comingSoon: string;
  };

  ventureDetail: {
    allVentures: string;
    briefLabel: string;
    detailsLabel: string;
    statusTerm: string;
    yearTerm: string;
    roleTerm: string;
    stackTerm: string;
    coverCaption: string;
    statusLabels: {
      active: string;
      "pre-launch": string;
      "coming-soon": string;
      archived: string;
    };
  };

  /** Journal routes are still live for any deep-link, but no longer surfaced in nav/home/footer. */
  journal: {
    metaTitle: string;
    metaDescription: string;
    section: string;
    titleA: string;
    titleB: string;
    description: string;
    noEntries: string;
    read: string;
    back: string;
  };

  contact: {
    metaTitle: string;
    metaDescription: string;
    section: string;
    titleA: string;
    titleB: string;
    description: string;
    channelsLabel: string;
    channels: {
      general: string;
      partners: string;
      press: string;
    };
    registeredLabel: string;
    registered: string[];
  };

  footer: {
    blurb: string;
    navLabel: string;
    registeredLabel: string;
    registeredA: string;
    registeredB: string;
    copyright: string;
  };

  notFound: {
    eyebrow: string;
    title: string;
    body: string;
    button: string;
  };
}

export const enDict: Dict = {
  lang: "en",
  prefix: "",

  nav: {
    ventures: "Ventures",
    about: "About",
    contact: "Contact",
    switchTo: "中文",
  },

  home: {
    eyebrow: "EST. 2026 · DELAWARE",
    titleA: "Holds equity in",
    titleB: "operating ventures.",
    description: "One venture: zZuP!",
    viewVentures: "View ventures",
    aboutLink: "About RJZ →",
    indexLabel: "Index",
    indexValue: "000 / 001",
    coordinatesLabel: "Coordinates",
    locationLabel: "Medfield, MA",
    ventures: {
      index: "01",
      label: "Ventures",
      title: "The position on the books.",
      description:
        "Externally co-owned, independently incorporated. RJZ holds equity, not control.",
    },
    cta: {
      index: "02",
      label: "Contact",
      title: "Investment or partnership inquiries?",
      description:
        "Equity, acquisition, or governance conversations are welcome. Replies are human.",
      button: "Get in touch",
    },
  },

  about: {
    metaTitle: "About",
    metaDescription:
      "RJZ Holdings LLC is a Delaware-registered single-member LLC. A single-purpose holding company.",
    section: "00 / About",
    titleA: "RJZ Holdings is a single-purpose",
    titleB: "holding company.",
    mandateLabel: "Mandate",
    mandateBody: [
      "RJZ Holdings LLC is a Delaware-registered single-member LLC established in 2026. Its function is to hold equity in operating ventures.",
      "Currently RJZ Holdings holds one position: zZuP! Inc., an externally co-founded consumer social application. The Ventures section is the public record of that position.",
    ],
    founderLabel: "Founder",
    founderName: "Rujian Zhang",
    founderBio: [
      "Founder & sole member of RJZ Holdings LLC. Co-founder of zZuP! Inc., the venture in which RJZ Holdings holds equity.",
      "Writes from Medfield, Massachusetts.",
    ],
    founderPortraitCaption: "800×1000 portrait",
    recordLabel: "Record",
    record: {
      founder: { term: "Founder", value: "Rujian Zhang" },
      jurisdiction: { term: "Jurisdiction", value: "Delaware, USA" },
      registeredAgent: {
        term: "Registered Agent",
        value: "Northwest Registered Agent",
      },
      established: { term: "Established", value: "2026" },
      hq: { term: "Operating Headquarters", value: "Medfield, MA" },
      domain: { term: "Domain", value: "rjzholdings.com" },
    },
    structureLabel: "Structure",
    structureBody: [
      "RJZ Holdings runs no day-to-day operations and ships no product. Its function is legal and financial: holding the position, signing agreements, recording the record.",
      "The portfolio is intentionally small and concentrated. New positions are added rarely, and only when the founder is directly involved in the underlying venture.",
    ],
  },

  ventures: {
    metaTitle: "Ventures",
    metaDescription: "Operating companies under the RJZ Holdings umbrella.",
    section: "01 / Ventures",
    titleA: "All operating companies",
    titleB: "under the RJZ umbrella.",
    description:
      "Each entry has its own case study. Status reflects current operating state, not lifetime intent.",
    readCaseStudy: "Read case study",
    comingSoon: "Coming soon",
  },

  ventureDetail: {
    allVentures: "All ventures",
    briefLabel: "Brief",
    detailsLabel: "Details",
    statusTerm: "Status",
    yearTerm: "Year",
    roleTerm: "Role",
    stackTerm: "Stack",
    coverCaption: "hero image — supply 1600×1000+",
    statusLabels: {
      active: "Active",
      "pre-launch": "Pre-launch",
      "coming-soon": "Coming soon",
      archived: "Archived",
    },
  },

  journal: {
    metaTitle: "Journal",
    metaDescription: "Notes from inside RJZ Holdings.",
    section: "02 / Journal",
    titleA: "Notes from inside",
    titleB: "the holding company.",
    description:
      "Short writing on what we're building and why. Updated occasionally, not on a schedule.",
    noEntries: "No entries yet.",
    read: "Read →",
    back: "Journal",
  },

  contact: {
    metaTitle: "Contact",
    metaDescription: "Get in touch with RJZ Holdings.",
    section: "02 / Contact",
    titleA: "A real person reads this.",
    titleB: "No forms, no funnels.",
    description:
      "Email is the fastest way. Equity, acquisition, governance, or press — mention the topic so it routes correctly.",
    channelsLabel: "Channels",
    channels: {
      general: "General",
      partners: "Investment / Partnerships",
      press: "Press",
    },
    registeredLabel: "Registered",
    registered: [
      "RJZ Holdings LLC",
      "Delaware, USA",
      "c/o Northwest Registered Agent",
    ],
  },

  footer: {
    blurb:
      "A Delaware-registered holding company for software, capital, and ideas.",
    navLabel: "Navigate",
    registeredLabel: "Registered",
    registeredA: "Delaware, USA",
    registeredB: "Est. 2026",
    copyright: "RJZ Holdings LLC",
  },

  notFound: {
    eyebrow: "Error / 404",
    title: "Nothing at this address.",
    body: "The page you're looking for doesn't exist, or hasn't been built yet.",
    button: "Back to home",
  },
};

export const zhDict: Dict = {
  lang: "zh",
  prefix: "/zh",

  nav: {
    ventures: "公司组合",
    about: "关于",
    contact: "联系",
    switchTo: "EN",
  },

  home: {
    eyebrow: "成立于 2026 · 美国 特拉华州",
    titleA: "持有运营公司的股权。",
    titleB: "",
    description: "目前持有：zZuP!",
    viewVentures: "查看公司组合",
    aboutLink: "关于 RJZ →",
    indexLabel: "编号",
    indexValue: "000 / 001",
    coordinatesLabel: "坐标",
    locationLabel: "马萨诸塞州 Medfield",
    ventures: {
      index: "01",
      label: "公司组合",
      title: "账面上的持股。",
      description:
        "外部联合持股，独立注册成立。RJZ 持有股权，不掌握控制权。",
    },
    cta: {
      index: "02",
      label: "联系",
      title: "投资或合作洽谈？",
      description: "股权、收购、治理相关的洽谈都欢迎。回复来自真人。",
      button: "联系我们",
    },
  },

  about: {
    metaTitle: "关于",
    metaDescription:
      "RJZ Holdings LLC 是一家在美国特拉华州注册成立的单一成员 LLC。一家单一持股的控股公司。",
    section: "00 / 关于",
    titleA: "RJZ Holdings 是",
    titleB: "一家单一持股的控股公司。",
    mandateLabel: "使命",
    mandateBody: [
      "RJZ Holdings LLC 是一家于 2026 年在美国特拉华州注册成立的单一成员 LLC。它的职能是持有运营公司的股权。",
      "RJZ Holdings 目前持有一个股权头寸：zZuP! Inc.，一家外部联合创办的消费级社交应用。「公司组合」一栏是这一头寸的公开记录。",
    ],
    founderLabel: "创始人",
    founderName: "Rujian Zhang",
    founderBio: [
      "RJZ Holdings LLC 创始人 / 唯一成员。zZuP! Inc. 联合创始人——后者正是 RJZ Holdings 当前持股的项目。",
      "据点位于美国马萨诸塞州 Medfield。",
    ],
    founderPortraitCaption: "800×1000 人像",
    recordLabel: "档案",
    record: {
      founder: { term: "创始人", value: "Rujian Zhang" },
      jurisdiction: { term: "注册地", value: "美国 特拉华州" },
      registeredAgent: {
        term: "注册代理",
        value: "Northwest Registered Agent",
      },
      established: { term: "成立年份", value: "2026" },
      hq: { term: "运营地点", value: "美国 马萨诸塞州 Medfield" },
      domain: { term: "域名", value: "rjzholdings.com" },
    },
    structureLabel: "结构",
    structureBody: [
      "RJZ Holdings 不承担日常运营，也不直接交付产品。它的职能是法律和财务层面的：持有头寸、签署协议、留存记录。",
      "组合刻意保持小而集中。新增持股很少发生，并且只在创始人直接介入底层项目时才会发生。",
    ],
  },

  ventures: {
    metaTitle: "公司组合",
    metaDescription: "RJZ 旗下的运营项目。",
    section: "01 / 公司组合",
    titleA: "RJZ 旗下的",
    titleB: "全部项目。",
    description:
      "每一个项目都有完整的案例。状态反映当前情况，不代表长期承诺。",
    readCaseStudy: "查看案例",
    comingSoon: "即将上线",
  },

  ventureDetail: {
    allVentures: "返回公司列表",
    briefLabel: "简介",
    detailsLabel: "详情",
    statusTerm: "状态",
    yearTerm: "年份",
    roleTerm: "角色",
    stackTerm: "技术栈",
    coverCaption: "封面图 — 建议 1600×1000 起",
    statusLabels: {
      active: "运营中",
      "pre-launch": "上线前",
      "coming-soon": "即将上线",
      archived: "已归档",
    },
  },

  journal: {
    metaTitle: "日志",
    metaDescription: "来自 RJZ Holdings 内部的记录。",
    section: "02 / 日志",
    titleA: "来自控股公司内部",
    titleB: "的记录。",
    description: "关于我们在做什么、为什么这么做的短文。不定期更新，不按节奏。",
    noEntries: "暂无日志。",
    read: "阅读 →",
    back: "日志",
  },

  contact: {
    metaTitle: "联系",
    metaDescription: "联系 RJZ Holdings。",
    section: "02 / 联系",
    titleA: "回复你的是真人。",
    titleB: "没有表单，没有漏斗。",
    description: "邮件最快。股权、收购、治理或媒体事项——请在主题里写清方向，方便分发。",
    channelsLabel: "联系方式",
    channels: {
      general: "通用",
      partners: "投资 / 合作",
      press: "媒体",
    },
    registeredLabel: "注册信息",
    registered: [
      "RJZ Holdings LLC",
      "美国 特拉华州",
      "c/o Northwest Registered Agent",
    ],
  },

  footer: {
    blurb: "一家在美国特拉华州注册的控股公司。运营软件，持有股权，配置资本。",
    navLabel: "导航",
    registeredLabel: "注册信息",
    registeredA: "美国 特拉华州",
    registeredB: "成立于 2026",
    copyright: "RJZ Holdings LLC",
  },

  notFound: {
    eyebrow: "错误 / 404",
    title: "这个地址下什么也没有。",
    body: "你要找的页面不存在，或者还没建好。",
    button: "回首页",
  },
};

export function getDict(lang: Lang): Dict {
  return lang === "zh" ? zhDict : enDict;
}
