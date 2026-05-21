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
    titleA: "Operates software. Holds equity. Allocates capital.",
    titleB: "",
    description: "Three projects. One umbrella.",
    viewVentures: "View ventures",
    aboutLink: "About RJZ →",
    indexLabel: "Index",
    indexValue: "000 / 001",
    coordinatesLabel: "Coordinates",
    locationLabel: "Medfield, MA",
    ventures: {
      index: "01",
      label: "Ventures",
      title: "Operating companies under the RJZ umbrella.",
      description: "Some independently incorporated. Some operated directly.",
    },
    cta: {
      index: "02",
      label: "Contact",
      title: "Working on something the umbrella might fit?",
      description:
        "Investment, consulting, or operating partnership inquiries are welcome. Responses are written by a human.",
      button: "Get in touch",
    },
  },

  about: {
    metaTitle: "About",
    metaDescription:
      "RJZ Holdings LLC is a Delaware-registered single-member LLC established in 2026.",
    section: "00 / About",
    titleA: "RJZ Holdings is the structure",
    titleB: "behind the work.",
    mandateLabel: "Mandate",
    mandateBody: [
      "RJZ Holdings LLC is a Delaware-registered single-member LLC established in 2026. It operates software projects directly and holds equity in externally co-owned ventures.",
      "Some projects under RJZ are independently incorporated; others are operated directly. The Ventures section lists current status for each.",
    ],
    founderLabel: "Founder",
    founderName: "Rujian Zhang",
    founderBio: [
      "Founder & sole member of RJZ Holdings LLC. Operates and builds across three lines simultaneously — consumer social software, research tooling, and legal-tech — and uses the holding company as the institutional structure that ties them together.",
      "Current portfolio under direct operating involvement: zZuP! (co-founder & CSO), LogicLink (sole developer), and the HNDSL Legal Portal (sole developer, built for Hainan Deselli Law Firm). Works in TypeScript / React / Next.js / Supabase / Python.",
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
      "Some ventures are independently incorporated and externally co-owned; others are operated directly under RJZ. Each has its own roadmap.",
      "RJZ provides shared capital, infrastructure, and brand across all projects.",
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
      "Email is the fastest way. Mention which venture or topic the message is about so it routes correctly.",
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
    eyebrow: "成立于 2026 · 特拉华州",
    titleA: "一家控股公司",
    titleB: "承载软件、资本与构想。",
    description:
      "RJZ Holdings 持有旗下运营公司的股权，跨项目分配资本，为伞下的所有工作提供机构化结构。",
    viewVentures: "查看公司组合",
    aboutLink: "关于 RJZ →",
    indexLabel: "编号",
    indexValue: "000 / 001",
    coordinatesLabel: "坐标",
    locationLabel: "马萨诸塞州 Medfield",
    ventures: {
      index: "01",
      label: "公司组合",
      title: "RJZ 伞下的运营公司。",
      description: "部分独立注册，部分直接运营。",
    },
    cta: {
      index: "02",
      label: "联系",
      title: "在做的事可能适合 RJZ 伞下？",
      description: "欢迎投资、咨询或运营合作的洽谈。回复来自真人。",
      button: "联系我们",
    },
  },

  about: {
    metaTitle: "关于",
    metaDescription:
      "RJZ Holdings LLC 是一家于 2026 年在特拉华州注册的控股公司。",
    section: "00 / 关于",
    titleA: "RJZ Holdings 是承载工作的",
    titleB: "底层结构。",
    mandateLabel: "使命",
    mandateBody: [
      "RJZ Holdings LLC 是一家于 2026 年在美国特拉华州注册成立的控股公司，存在的目的是持有旗下运营公司的股权、跨项目管理资本配置，并为软件开发、咨询服务、内容输出与投资活动提供机构化的伞形结构。",
      "控股公司本身不直接面向终端用户提供产品或服务——具体业务由旗下各家运营公司承担。每家公司各自独立组织，详见公司组合一栏。",
    ],
    founderLabel: "创始人",
    founderName: "Rujian Zhang",
    founderBio: [
      "RJZ Holdings LLC 创始人 / 唯一成员。同时跨三条业务线运营与开发：消费级社交软件、研究工具、法律科技——并以控股公司作为把三者串起来的机构结构。",
      "当前直接参与运营的项目：zZuP!（联合创始人 & CSO）、LogicLink（独立开发者）、海南德赛利律所案件管理系统（独立开发者）。技术栈以 TypeScript / React / Next.js / Supabase / Python 为主。",
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
      "伞下每家公司都有独立的法律实体、股权结构与运营计划。控股公司提供共享资源——资本、基础设施、品牌——但不稀释各运营公司的自主性。",
      "这一页是记录，不是市场宣传。任何不清楚的地方，欢迎来问。",
    ],
  },

  ventures: {
    metaTitle: "公司组合",
    metaDescription: "RJZ Holdings 伞下的运营公司。",
    section: "01 / 公司组合",
    titleA: "RJZ 伞下的",
    titleB: "全部运营公司。",
    description: "每一家都有完整的案例。状态反映当前运营情况，不代表长期意图。",
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
    titleB: "没有表单，也没有营销漏斗。",
    description: "邮件是最快的方式。在主题里说明涉及哪家公司或什么主题，便于路由。",
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
    blurb: "一家在特拉华州注册的控股公司——承载软件、资本与构想。",
    navLabel: "导航",
    registeredLabel: "注册信息",
    registeredA: "美国 特拉华州",
    registeredB: "成立于 2026",
    copyright: "RJZ Holdings LLC",
  },

  notFound: {
    eyebrow: "错误 / 404",
    title: "这个地址下什么也没有。",
    body: "你访问的页面不存在，或者还没建好。",
    button: "返回首页",
  },
};

export function getDict(lang: Lang): Dict {
  return lang === "zh" ? zhDict : enDict;
}
