import type { LabelItem } from "../types/accounts";

export function parseLabels(raw: string): LabelItem[] {
    return raw.split(';').map(str => str.trim()).filter(item => Boolean(item)).map(str => ({text: str}))
}

export function labelsToString(labels: LabelItem[]): string {
    return labels.map(label => label.text).join('; ')
}