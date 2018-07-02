const HostByMask = [
    2, 6, 14, 30, 62, 126, 254,
    510, 1022, 2046, 4094, 8190, 16382, 32766, 65534,
    131070, 262142, 524286, 1048574, 2097150, 4194302, 8388606, 16777214,
    33554432, 67108864, 134217728, 268435456, 536870912, 1073741824, 2147483648
];

function toNumber(str) {
    return parseInt(str);
}

export function getMask(hosts) {
    let mask = 30;
    for (let i = 0; i < HostByMask.length; i++) {
        if (hosts <= HostByMask[i]) {
            mask = mask - i;
            break;
        }
    }

    return mask;
}

export function getMaskAddress(mask) {
    return inet_ntoa(subnet_netmask(mask));
}

export function getNetwork(ip, mask) {
    return ip;
}

export function getBroadcast(ip, mask) {
    return inet_ntoa(subnet_last_address(inet_aton(ip), mask));
}

export function nextNetwork(ip) {
    return inet_ntoa(inet_aton(ip) + 1);
}

function inet_ntoa(addrint) {
    return ((addrint >> 24) & 0xff) + '.' +
        ((addrint >> 16) & 0xff) + '.' +
        ((addrint >> 8) & 0xff) + '.' +
        (addrint & 0xff);
}

function inet_aton(addrstr) {
    var re = /^([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})\.([0-9]{1,3})$/;
    var res = re.exec(addrstr);

    if (res === null) {
        return null;
    }

    for (var i = 1; i <= 4; i++) {
        if (res[i] < 0 || res[i] > 255) {
            return null;
        }
    }

    return (res[1] << 24) | (res[2] << 16) | (res[3] << 8) | res[4];
}

function network_address(ip, mask) {
    var maskbits = 0;
    for (var i = 31 - mask; i >= 0; i--) {
        ip &= ~1 << i;
    }
    return ip;
}

function subnet_addresses(mask) {
    return 1 << (32 - mask);
}

function subnet_last_address(subnet, mask) {
    return subnet + subnet_addresses(mask) - 1;
}

function subnet_netmask(mask) {
    return network_address(0xffffffff, mask);
}

