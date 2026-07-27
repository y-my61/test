
import { DB } from './db';
import {
    BankTransaction, CharacterProfile, LifeRecord, LifeRecordModule,
    LifeRecordSettings, MedPlan, Message,
} from '../types';
import { addLocalDays, getLocalDateKey } from './localDate';

/**
 * 生活记录（意完恩栈 App：生理期 / 药盒 / 记账 / 锻炼）
 *
 * 三条链路都收在这个文件里：
 *  1. 注入（读路径）：buildLifeRecordInjection —— 按角色开关把今日摘要 + 潜意识约束 +
 *     [[LIFE:...]] 指令说明 + 否决反馈拼成 system prompt section（chatPrompts 调用）。
 *  2. 代记（写路径）：executeLifeDirectives —— 解析角色输出里的 [[LIFE:...]] 指令，
 *     去重后落库并插入可交互的 life_card 消息（chatParser 调用，本地 / instant push 共用）。
 *  3. 裁决：resolveLifeRecordCard —— 用户点卡片「确认 / 否决」，否决时回滚（含银行流水）
 *     并给代记角色挂一条一次性反馈（Chat.tsx 调用）。
 *
 * 记账不独立存储：角色代记的支出直接写 BankApp 的 bank_transactions（BankApp 每次打开
 * 会从流水重算 todaySpent，所以这里只动流水即可），另落一条带 bankTxId 的 LifeRecord
 * 支撑卡片确认 / 否决回滚；注入摘要也直接读当日银行流水。*
//
