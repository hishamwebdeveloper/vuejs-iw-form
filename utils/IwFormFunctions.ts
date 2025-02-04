/**
 * Convert data to complete dropdown options (with optional 'All' or 'Null')
 * @param data
 * @param param1
 * @returns
 */
export function mapToDropdownOptions(
    data: { [key: string]: string },
    {
        showAll = true,
        showNull = false,
    }: {
        showAll?: boolean,
        showNull?: boolean,
    }) {
    const res: IwFormInputSelectOption[] = []

    if (showNull) {
        res.push({ value: '', label: '(Empty Value)', operator: 'null' })
    }

    if (showAll && !data['all']) {
        res.push({ value: '', label: 'All' })
    }

    // example data: {"salesManagers":{"2":"sales1@vilor.com","3":"sales2@vilor.com"}}
    for (const [key, val] of Object.entries(data)) {
        res.push({ value: key, label: val })
    }

    return res
}

export function mapToDropdownFromObject(data: { [key: string]: string },
    {
        showAll = true,
        showNull = false,
    }: {
        showAll?: boolean,
        showNull?: boolean,
    }) {
    const res: IwFormInputSelectOption[] = []

    if (showNull) {
        res.push({ value: '', label: '(Empty Value)', operator: 'null' })
    }

    if (showAll && !data['all']) {
        res.push({ value: '', label: 'All' })
    }

    for (const [key, val] of Object.entries(data)) {
        res.push({ value: key, label: val })
    }

    return res
}

/**
 * same as mapToDropdownOptions, but allow user to specify the keyName
 *
 * @param data
 * @param labelName
 * @param param2
 * @returns return Object to be used by select options, e.g. {{value: 1, label: label}, ...}
 *
 * Sample data
 * { { "id": 1, "name": "COMPANY_SUPER_ADMIN", "label": "Company Super Admin" }, ...}
 */
export function mapToDropdownOptionsWithKey(
    data: any, labelName: string, {
        keyName = 'id',
        showAll = true,
        showNull = false,
    }: {
        keyName?: string
        showAll?: boolean,
        showNull?: boolean,
    },
) {
    const res: IwFormInputSelectOption[] = []

    if (showNull) {
        res.push({ value: '', label: '(Empty Value)', operator: 'null' })
    }

    if (showAll && !data['all']) {
        res.push({ value: '', label: 'All' })
    }

    if (Array.isArray(data)) {
        for (const item of data) {
            res.push({ value: item[keyName], label: item[labelName] })
        }
    } else {
        res.push({ value: data[keyName], label: data[labelName] })
    }

    return res
}

export function setAppendIconOnClickFn(
    appendIconOnClickFn: Function,
    // currentValue: any,
    // formData: any
) {
    if (typeof appendIconOnClickFn === 'function')
        return appendIconOnClickFn();
    else return '';
}

export function setClearable(isItemEditable: boolean | null, isReadOnly: boolean) {
    return !isReadOnly && (isItemEditable || true);
}

function setVisible(isVisible: Function | boolean) {
    // if (typeof isVisible === 'function')
    //     return isVisible(this.myformData);
    // else if (typeof isVisible === 'boolean') return isVisible;
    // else return true;
}

export function setOnClick(item: IwFormInput, myformData: any) {
    if (item.onClickFn) {
        item.onClickFn(myformData);
    }
}

/**
 * `item.allowedDateFn` can be
 * - a callback function:
 * - string:
 *   'min': date after item.allowedDate[0] will be allowed
 *   'max': date earlier than item.allowedDate[0] will be allowed
 *   'between': date between item.allowedDate[0] and item.allowedDate[1] will be allowed
 *
 * `item.allowedDate` is an array
 * - can be single or two value depending on `item.allowedDateFn` usage
 * - date format must be 'YYYY/MM/DD', example: 2019/08/05
 *
 * param @mydate
 *      calendar will pass in every date of the month
 *      Example for month of August, it will start with '2019/08/01', '2019/08/02',...
 *
 */
export function setAllowedDate(item: any, mydate: string) {
    if (!item.allowedDateFn) return true;
    if (typeof item.allowedDateFn === 'function') {
        return item.allowedDateFn(item, mydate);
    } else if (item.allowedDateFn === 'min') {
        return mydate > item.allowedDate[0];
    } else if (item.allowedDateFn === 'max') {
        return mydate < item.allowedDate[0];
    } else if (item.allowedDateFn === 'between') {
        return (
            mydate >= item.allowedDate[0] &&
            mydate <= item.allowedDate[1]
        );
    }
    return item.allowedDate;
}

export default function IwFormFunctions() { }
