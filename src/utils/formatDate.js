export function formatDate(date_string) {

    const date_obj = new Date(date_string);

    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
    };

    const formatter = new Intl.DateTimeFormat('en-UK', options);
    const formatted_date = formatter.format(date_obj);

    return formatted_date;
}