export class FilterUtils {

  public static filter(value: any[], fields: any[], filterValue: string, filterMode: string) {
    const filteredItems: any[] = [];
    const filterText = filterValue.toLowerCase();

    if (value) {
      for (const item of value) {
        for (const field of fields) {
          const fieldValue = String(item[field]).toLowerCase();

          if (FilterUtils[filterMode](fieldValue, filterText)) {
            filteredItems.push(item);
            break;
          }
        }
      }
    }
    return filteredItems;
  }

  public static startsWith(value, filter): boolean {
    if (filter === undefined || filter === null || filter.trim() === '') {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    const filterValue = filter.toString().toLowerCase();
    const stringValue = value.toString().toLowerCase();

    return stringValue.slice(0, filterValue.length) === filterValue;
  }

  public static contains(value, filter): boolean {
    if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    const filterValue = filter.toString().toLowerCase();
    const stringValue = value.toString().toLowerCase();

    return stringValue.indexOf(filterValue) !== -1;
  }

  public static endsWith(value, filter): boolean {
    if (filter === undefined || filter === null || filter.trim() === '') {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }

    const filterValue = filter.toString().toLowerCase();
    const stringValue = value.toString().toLowerCase();

    return stringValue.indexOf(filterValue, stringValue.length - filterValue.length) !== -1;
  }

  public static equals(value, filter): boolean {
    if (filter === undefined || filter === null || (typeof filter === 'string' && filter.trim() === '')) {
      return true;
    }

    if (value === undefined || value === null) {
      return false;
    }
    return value.toString().toLowerCase() === filter.toString().toLowerCase();
  }
}
