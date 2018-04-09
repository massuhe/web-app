export  class TimezoneFixer {

    public static fixTimezone(date: Date): Date {
        const dateFixed = new Date(date.getTime());
        dateFixed.setHours(dateFixed.getHours() - dateFixed.getTimezoneOffset() / 60);
        return dateFixed;
    }

}
